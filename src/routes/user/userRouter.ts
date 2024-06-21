/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import userController from '../../controllers/user';
import { ipMiddleware } from '../../middleware/capture';
import logger from '../../middleware/logger';
import loginRequired from '../../middleware/loginRequired';

const userRoute: Router = Router();

userRoute.use(ipMiddleware);

userRoute.get('/test', loginRequired, (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    userController.test(req, res);
});

userRoute.get('/:id', loginRequired, (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    userController.show(req, res);
});

userRoute.put('/edit/', (req: Request, res: Response) => {
    logger.info('PUT: /', { ip: (req as any).clientIp });
    userController.update(req, res);
});

userRoute.delete('/', loginRequired, (req: Request, res: Response) => {
    logger.info('DELETE: /', { ip: (req as any).clientIp });
    userController.delete(req, res);
});

export { userRoute };
