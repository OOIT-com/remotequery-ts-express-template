import "dotenv/config";
import { Myapp } from "./myapp/myapp";
import validateEnv from "./utils/validateEnv";
import IController from "./IController";
import { RemoteQueryController } from "./myapp/RemoteQueryController";
import StaticTestController from "./myapp/StaticTestController";

validateEnv();

const controllers: IController[] = [
  new RemoteQueryController(),
  new StaticTestController(),
];

const startup = async () => {
  const myapp = new Myapp(controllers);
  await myapp.init();
  myapp.listen();
};

startup().catch(console.error);
