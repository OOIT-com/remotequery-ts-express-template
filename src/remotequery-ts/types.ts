export type PValue = boolean | string | number | null;
export type PRecord = Record<string, PValue>;

export type RqRequest = {
  userId?: string;
  roles?: string[];
  serviceId: string;
  parameters: PRecord;
};
export type Context = {
  recursion: number;
  contextId: number;
  rowsAffectedList: number[];
  userMessages: string[];
  systemMessages: string[];
  statusCode: number;
  includes: Record<string, number>;
  maxRows?: number;
  serviceEntry?: RqServiceEntry;
  txId?: string;
};

export type ServiceFun = (request: RqRequest, context?: Partial<Context>) => Promise<RqResult>;

export type RqServiceEntry = {
  serviceId: string;
  roles?: string[];
  statements?: string;
  service?: ServiceFun;
  tags?: Set<string>;
  origin?: string;
};

export interface ExceptionResult {
  exception: string;
  stack?: string;
}

export interface RqResult extends Partial<ExceptionResult> {
  name?: string;
  types?: string[];
  headerSql?: string[];
  header?: string[];
  table?: PValue[][];
  rowsAffected?: number;
  from?: number;
  hasMore?: boolean;
}

export interface ResultWithData extends RqResult {
  header: string[];
  table: string[][];
}

export type LoggerLevel = 'debug' | 'info' | 'warn' | 'error';
export type LoggerFun = (msg: string) => void;
export type Logger = Record<LoggerLevel, LoggerFun>;
export type ProcessSqlDirect = (sql: string, values: PValue[], maxRows: number) => Promise<RqResult>;

export type ProcessSql = (sql: string, parameters?: PRecord, context?: Partial<Context>) => Promise<RqResult>;

export interface RqDriver<ConnectionType = unknown> {
  processSql: ProcessSql;
  processSqlDirect: ProcessSqlDirect;
  returnConnection: (con: ConnectionType) => void;
  getConnection: () => Promise<ConnectionType | undefined>;

  startTransaction: () => Promise<string>;
  commitTransaction: (txId: string) => Promise<void>;
  rollbackTransaction: (txId: string) => Promise<void>;
  destroy: () => Promise<void>;
}

export type RqResultOrList = RqResult | PRecord[];

export type SqlStatementWithFilename = { text: string; origin: string };
export type SqlFilesContent = { serviceEntries: RqServiceEntry[]; sqlStatements: SqlStatementWithFilename[] };
export type SplitStatementFunction = (s: string) => string[];
