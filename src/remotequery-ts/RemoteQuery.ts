import { Context, RqDriver, RqRequest, RqResult, RqServiceEntry, SplitStatementFunction } from './types';
import { checkAccess, splitStatements } from './utils';

export class RemoteQuery {
  private readonly driver: RqDriver;
  private readonly serviceEntryMap: Record<string, RqServiceEntry> = {};
  private splitStatementFunction: SplitStatementFunction = splitStatements;

  public constructor(driver: RqDriver) {
    this.driver = driver;
  }

  public removeServiceEntry(serviceId: string) {
    if (this.serviceEntryMap[serviceId]) {
      delete this.serviceEntryMap[serviceId];
    }
  }

  public addServiceEntry(se: RqServiceEntry) {
    this.serviceEntryMap[se.serviceId] = se;
  }

  public getServiceEntries(): RqServiceEntry[] {
    return Object.values(this.serviceEntryMap);
  }

  public getDriver(): RqDriver {
    return this.driver;
  }

  public run = async (request: RqRequest): Promise<RqResult> => {
    const serviceEntry = this.serviceEntryMap[request.serviceId];
    if (!serviceEntry) {
      return {
        exception: `No service entry found for serviceId: ${request.serviceId}`
      };
    }
    const accessCheckResult = checkAccess(request.roles || [], serviceEntry.roles);
    if (accessCheckResult) {
      return {
        exception: `Access check failed for ${request.serviceId}: ${accessCheckResult}`
      };
    }
    const context: Partial<Context> = { serviceEntry };
    if (serviceEntry.statements) {
      const sqls = this.splitStatementFunction(serviceEntry.statements);
      let result: RqResult = {};
      for (const sql of sqls) {
        result = await this.driver.processSql(sql, request.parameters, context);
      }
      return result;
    } else if (serviceEntry.service) {
      return serviceEntry.service(request, context);
    }
    return {
      exception: `No statements and no service found for: ${request.serviceId}`
    };
  };

  public setSplitStatementFunction(splitStatementFunction: SplitStatementFunction) {
    this.splitStatementFunction = splitStatementFunction;
  }
}

// After
export const newRemoteQuery = (driver: RqDriver): RemoteQuery => new RemoteQuery(driver);
