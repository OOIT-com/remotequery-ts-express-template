import "dotenv/config";
import { App } from "./app";
import validateEnv from "./utils/validateEnv";
import IController from "./controller/IController";
import { ApiController } from "./controller/ApiController";
import StaticTestController from "./controller/StaticTestController";

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
