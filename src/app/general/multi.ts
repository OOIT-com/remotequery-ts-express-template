import {
  asString,
  isError,
  RqRequest,
  RqResult,
  ServiceFun,
} from "../../remotequery-ts";
import { getRq } from "../../utils/rq-init";

export const multi: ServiceFun = async (request): Promise<RqResult> => {
  const results: RqResult[] = [];
  const requestString = asString(request.parameters.requests);
  if (!requestString) {
    return { exception: "multi request is empty" };
  }
  try {
    let requests: RqRequest[] = JSON.parse(requestString);
    for (const r of requests) {
      const result = await getRq().run(r);
      results.push(result);
    }
  } catch (err) {
    if (isError(err)) {
      results.push({ exception: err.message });
    }
  }
  return results.reduce<RqResult>(
    (a, r) => {
      a.table?.push([JSON.stringify(r)]);
      return a;
    },
    { header: ["MultiJson"], table: [] }
  );
};
