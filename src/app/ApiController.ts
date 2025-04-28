import * as express from "express";
import { Request, Response } from "express";
import IController from "../IController";
import { PRecord, PValue, RqRequest } from "../remotequery-ts";
import { errorMessage } from "../utils/status-message";
import { getRq } from "../utils/rq-init";
import moment from "moment";
import { getSession } from "./general/user-login";

export class ApiController implements IController {
  public name = "ApiController";
  public path = "/remoteQuery";
  public router = express.Router();

  constructor() {
    this.initializeRouters();
  }

  initializeRouters(): void {
    this.router.post("/*", processHttpRequest);
    this.router.get("/*", processHttpRequest);
  }
}

const processHttpRequest = (req: Request, res: Response) => {
  const url = req.path;
  // map url such as: './users/search' to serviceId such as: 'user.search'
  const serviceId = url.replace(/\//gi, ".").replace(/^./gi, "");
  processService(serviceId, req, res);
};

export async function processService(
  serviceId: string,
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (!serviceId) {
      res.json({ status: "error", systemMessage: "No service id provided!" });
      return;
    }
    const parameters = toParameters(req);
    const rqRequest: RqRequest = {
      serviceId,
      parameters,
      userId: "1234",
      roles: ["SYSTEM"],
    };
    const result = await getRq().run(rqRequest);
    res.json(
      result || { status: "error", systemMessage: "Result was empty (null)" }
    );
  } catch (e) {
    res.json(errorMessage("Serious Error", e as Error));
  }
}

export function toParameters(req: Request): PRecord {
  const parameters: PRecord = {};
  fillParameters(parameters, req.query as never);
  fillParameters(parameters, req.body as never);

  const session = getSession(parameters.sessionId?.toString() ?? "");
  if (session) {
    return {
      ...parameters,
      SESSIONID: session.sessionId,
      USERID: session.userId,
      USERTID: session.userTid,
      CURRENT_TIME_MILLIS: moment().valueOf(),
    };
  }

  return {
    ...parameters,
    CURRENT_TIME_MILLIS: moment().valueOf(),
  };
}

function fillParameters(parameters: PRecord, params: never) {
  if (typeof params === "object") {
    for (const [name, value] of Object.entries(params)) {
      let _value = value;
      if (Array.isArray(value)) {
        parameters[name + "_array"] = value as unknown as PValue;
        _value = value.join(",");
      }
      parameters[name] = _value as PValue;
    }
  }
}
