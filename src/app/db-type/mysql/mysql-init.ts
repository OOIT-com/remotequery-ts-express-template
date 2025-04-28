import { Logger, RqDriver } from "../../../remotequery-ts";

export async function initNEXTVAL(rqDriver: RqDriver, logger: Logger) {
  await rqDriver.processSql("drop function if exists nextval");

  const createNextvalFun = `
    CREATE FUNCTION NEXTVAL()
      RETURNS BIGINT
      DETERMINISTIC
      LANGUAGE SQL
    BEGIN
      set @maxcounter := (select max(i.COUNTER) from T_SEQUENCE i);
        delete from T_SEQUENCE where COUNTER <> @maxcounter;
      update T_SEQUENCE set COUNTER = COUNTER + 1;
      return  (select max(COUNTER) from T_SEQUENCE);
    END
    `;

  const result = await rqDriver.processSql(createNextvalFun);
  if (result.exception) {
    logger.error(result.exception);
  } else {
    logger.info(JSON.stringify(result));
  }
}
