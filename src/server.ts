import "dotenv/config";
import { App } from "./app/app";
import validateEnv from "./utils/validateEnv";
import IController from "./IController";
import { ApiController } from "./app/ApiController";
import StaticTestController from "./app/StaticTestController";

validateEnv();

const controllers: IController[] = [
  new ApiController(),
  new StaticTestController(),
];

const startup = async () => {
  const app = new App(controllers);
  await app.init();
  app.listen();
};

startup();
