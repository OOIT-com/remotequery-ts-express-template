import { Router } from 'express';

export default interface IController {
    name: string;
    path: string;
    router: Router;
}
