import * as express from 'express';
import { Request, Response } from 'express';

import fs from 'fs';
import IController from "./IController";

export default class StaticTestController implements IController {
  public name = 'StaticTestController';
  public path = '/StaticTestController';
  public router = express.Router();

  constructor() {
    this.initializeRouters();
  }

  initializeRouters(): void {
    this.router.use('/test', resolveTestdata('test'));
  }
}

function resolveTestdata(filename: string) {
  return (req: Request, res: Response) => {
    const rawdata = fs.readFileSync(`testdata/${filename}.json`);
    const json = JSON.parse(rawdata.toString());
    res.json(json);
  };
}
