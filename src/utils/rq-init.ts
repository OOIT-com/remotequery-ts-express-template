/* tslint:disable:no-console */
import { RemoteQuery, RqDriver } from "../remotequery-ts";
import { PSQLDriver } from "../remotequery-ts/drivers/psql/PSQLDriver";
import "dotenv/config";

export const getRq = (): RemoteQuery => rq;

let rq: RemoteQuery;

export async function rqInit() {
  if (rq) {
    console.info("initialized");
    return rq;
  }

  //
  // INIT Driver
  //

  const psqlDriver: RqDriver = new PSQLDriver({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  });

  rq = new RemoteQuery(psqlDriver);
}
