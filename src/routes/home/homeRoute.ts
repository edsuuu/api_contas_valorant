/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import HomeController from '../../controllers/home';
import { ipMiddleware } from '../../middleware/capture';
import logger from '../../middleware/logger';

const homeRoute: Router = Router();

homeRoute.use(ipMiddleware);

homeRoute.get('/', (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    HomeController.index(req, res);
});

export { homeRoute };
