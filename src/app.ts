import "dotenv/config";
import express, { Application, Request, Response } from "express";
import cors from "cors";

import path from "path";
import fileUpload from "express-fileupload";
import { getRq, rqInit } from "./utils/rq-init";
import IController from "./controller/IController";
import { serviceInit } from "./service/service-init"; // import errorMiddleware from './middleware/errorMiddleware';

export class App {
  public app: Application;
  private readonly controllers: IController[];

  constructor(controllers: IController[]) {
    this.controllers = controllers;
    this.app = express();
  }

  public async init() {
    await rqInit();
    await serviceInit(getRq());
    this.webInit();
  }

  private webInit() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      fileUpload({
        createParentPath: true,
      })
    );
    this.app.use(cors());

    // -------------------routes
    this.app.get("/home", cors(), (_request: Request, response: Response) => {
      console.log(_request.url);
      response.send(`Welcome to the Remote Query Ts Template Home page!`);
    });
    this.app.use("/favicon.ico", cors(), function (_: Request, res: Response) {
      res.sendFile(path.join(__dirname, "favicon.png"), {
        headers: {
          "Content-Disposition": "inline",
          "Content-Type": "image/png",
        },
      });
    });
    this.controllers.forEach((controller) => {
      console.info(
        `Initialize controller ${controller.name} with path: ${controller.path}`
      );
      this.app.use(controller.path, cors(), controller.router);
    });
  }

  public listen(): void {
    this.app.listen(process.env.PORT, () => {
      console.info(`App listening on port ${process.env.PORT}`);
    });
  }
}
