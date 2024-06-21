/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from 'express';
import authController from '../../controllers/auth';
import { ipMiddleware } from '../../middleware/capture';
import logger from '../../middleware/logger';

const authRoute: Router = Router();

authRoute.use(ipMiddleware);

authRoute.post('/', (req: Request, res: Response) => {
    logger.info('POST: /', { ip: (req as any).clientIp });
    authController.store(req, res);
});

export { authRoute };
