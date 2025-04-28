import { RemoteQuery, RqDriver } from "../remotequery-ts";
import { readSqlFiles } from "../remotequery-ts/util-reading-service-entries";
import path from "path";
import { multi } from "./general/multi";
import { userLogin } from "./general/user-login";

export const serviceInit = async (rq: RemoteQuery) => {
  const driver: RqDriver = rq.getDriver();

  const { serviceEntries, sqlStatements } = readSqlFiles(
    path.join(__dirname, "sql")
  );

  for (const sql of sqlStatements) {
    const res = await driver.processSql(sql.text);
    if (res.exception) {
      console.error(`Error in ${sql.origin}: ${res.exception}`);
    }
  }
  for (const se of serviceEntries) {
    rq.addServiceEntry(se);
  }
  rq.addServiceEntry({ serviceId: "MultiService", service: multi });
  rq.addServiceEntry({ serviceId: "UserLogin", service: userLogin });
  rq.addServiceEntry({ serviceId: "UserLogin", service: userLogin });
};
