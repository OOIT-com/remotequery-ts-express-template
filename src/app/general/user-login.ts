import {
  PValue,
  RqRequest,
  RqResult,
  ServiceFun,
  toList,
} from "../../remotequery-ts";
import { getRq } from "../../utils/rq-init";
import { SYSTEM } from "../constants";
import sha256 from "crypto-js/sha256";
import Hex from "crypto-js/enc-hex";

type Session = {
  userId: string;
  userTid: number;
  sessionId: string;
  time: number;
};

const sessions: Record<string, Session> = {};

export const getSession = (sessionId: string) => {
  const session = sessions[sessionId];
  if (session) {
    session.time = Date.now();
  }
  return session;
};

const logIn = async (userId: string, pwhash: PValue): Promise<RqResult> => {
  const result = await getRq().run({
    serviceId: "UserAccount.check",
    parameters: { userId, pwhash },
    roles: [SYSTEM],
  });
  const list = toList(result);
  if (list.length === 1) {
    const sessionId = generatePassword(32);
    const session: Session = {
      userId,
      time: Date.now(),
      sessionId,
      userTid: +(list[0].userTid || "-1"),
    };
    sessions[sessionId] = session;

    return await getRq().run({
      serviceId: "UserAccount.authData",
      parameters: { userId, sessionId: session.sessionId },
      roles: [SYSTEM],
    });
  } else {
    return { exception: "Wrong password" };
  }
};

export const userLogin: ServiceFun = async ({
  parameters,
}: RqRequest): Promise<RqResult> => {
  const { userId = "", pwhash, newPwhash, action } = parameters;
  if (!userId) {
    return { exception: "No userId" };
  }
  const uid = userId.toString();

  switch (action) {
    case "logIn": {
      return logIn(uid, pwhash);
    }
    case "newPasswordByMail": {
      const newPassword = generatePassword(10);
      console.debug(`new password for ${userId}) ${newPassword}`);
      const pwhash = sha256(newPassword).toString(Hex);
      const { rowsAffected, exception } = await getRq().run({
        serviceId: "UserAccount.newPwhash",
        parameters: { userId, pwhash },
        roles: [SYSTEM],
      });
      if (exception) {
        return { exception };
      }
      if (rowsAffected !== 1) {
        return { exception: "Could not create new password" };
      }
      break;
    }
    case "changePassword": {
      if (pwhash && newPwhash && userId) {
        const { rowsAffected, exception } = await getRq().run({
          serviceId: "UserAccount.changePwhash",
          parameters: { userId, pwhash, newPwhash },
          roles: [SYSTEM],
        });
        if (exception) {
          return { exception };
        } else {
          return logIn(uid, newPwhash);
        }
      }
      break;
    }
  }

  return { exception: "Not yet implemented" };
};

function generatePassword(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}
