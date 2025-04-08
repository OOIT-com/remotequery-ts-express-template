/* tslint:disable:no-console */
import { RemoteQuery, RqDriver } from "../remotequery-ts";
import { PSQLDriver } from "../remotequery-ts/drivers/psql/PSQLDriver";
import "dotenv/config";
import { initNEXTVAL } from "../service/db-type/mysql/mysql-init";

export const getRq = (): RemoteQuery => rq;

let rq: RemoteQuery;

export async function rqInit() {
  if (rq) {
    console.info("initialized");
    return rq;
  }

  //
  // INIT SQL
  //

  const dbType = process.env.DB_TYPE ?? "psql";
  const psqlDriver: RqDriver = new PSQLDriver({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  });

  if (dbType === "mysql") {
    await initNEXTVAL(psqlDriver, console);
  } else {
    console.debug("Init psql...");
  }

  rq = new RemoteQuery(psqlDriver);
}
