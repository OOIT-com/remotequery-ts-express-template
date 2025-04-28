import { getRq } from "../utils/rq-init";

export const newTid = async () =>
  (
    await getRq().run({
      serviceId: "newTid",
      roles: ["SYSTEM"],
      parameters: {},
    })
  ).table?.[0]?.[0] ?? "";
