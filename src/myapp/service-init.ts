import { RemoteQuery, RqDriver } from "../remotequery-ts";
import { readSqlFiles } from "../remotequery-ts/util-reading-service-entries";
import path from "path";
import { multi } from "./services/common/multi";
import { userLogin } from "./services/user/user-login";

export const serviceInit = async (rq: RemoteQuery) => {
  const driver: RqDriver = rq.getDriver();

  const sqDirs = [
    "services/common",
    "services/user",
    "services/training",
    "services/accounting",
  ];
  for (const sqlDir of sqDirs) {
    const { serviceEntries, sqlStatements } = readSqlFiles(
      path.join(__dirname, sqlDir)
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
  }

  rq.addServiceEntry({ serviceId: "MultiService", service: multi });
  rq.addServiceEntry({ serviceId: "UserLogin", service: userLogin });

  console.log(`List of Services`);
  for (const se of rq.getServiceEntries()) {
    console.log(`- ${se.serviceId}`);
  }
};
