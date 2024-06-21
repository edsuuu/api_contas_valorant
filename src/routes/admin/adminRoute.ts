/* eslint-disable @typescript-eslint/no-explicit-any */

import { Router, Request, Response } from 'express';

import adminController from '../../controllers/admin';
import loginRequired from '../../middleware/loginRequired';
import authorize from '../../middleware/authorization';
import { ipMiddleware } from '../../middleware/capture';
import logger from '../../middleware/logger';

const adminRoute: Router = Router();

adminRoute.use(ipMiddleware);

adminRoute.get('/logs', loginRequired, authorize('admin'), (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    adminController.logs(req, res);
});

adminRoute.get('/dashboard', loginRequired, authorize('admin'), (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    adminController.dash(req, res);
});

//listar todos usuarios
adminRoute.get('/users', loginRequired, authorize('admin'), (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    adminController.index(req, res);
});
//listar um usuario

adminRoute.get('/user/:id', loginRequired, authorize('admin'), (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    adminController.show(req, res);
});

//criar um usuario

adminRoute.post('/user/register/', loginRequired, authorize('admin'), (req: Request, res: Response) => {
    logger.info('POST: /', { ip: (req as any).clientIp });
    adminController.criarUser(req, res);
});

//atualiza user
adminRoute.put('/user/edit/:id', loginRequired, authorize('admin'), (req: Request, res: Response) => {
    logger.info('PUT: /', { ip: (req as any).clientIp });
    adminController.updateUser(req, res);
});

//deletar usuario
adminRoute.delete('/user/:id', loginRequired, authorize('admin'), (req: Request, res: Response) => {
    logger.info('DELETE: /', { ip: (req as any).clientIp });
    adminController.deleteUser(req, res);
});

export { adminRoute };
