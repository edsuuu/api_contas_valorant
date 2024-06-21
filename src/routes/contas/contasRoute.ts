/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response } from 'express';
import contasController from '@/controllers/contas';
import loginRequired from '@/middleware/loginRequired';
import { ipMiddleware } from '@/middleware/capture';
import logger from '@/middleware/logger';

const contaRoute: Router = Router();

contaRoute.use(ipMiddleware);

contaRoute.get('/', loginRequired, (req: Request, res: Response) => {
    logger.info('GET: /', { ip: (req as any).clientIp });
    contasController.index(req, res);
});

contaRoute.get('/:id', loginRequired, (req: Request, res: Response) => {
    logger.info('GET: /:id', { ip: (req as any).clientIp });
    contasController.show(req, res);
});

contaRoute.post('/', loginRequired, (req: Request, res: Response) => {
    logger.info('CREATE POST: /', { ip: (req as any).clientIp });
    contasController.store(req, res);
});

contaRoute.put('/:id', loginRequired, (req: Request, res: Response) => {
    logger.info('PUT: /:id', { ip: (req as any).clientIp });
    contasController.update(req, res);
});

contaRoute.delete('/:id', loginRequired, (req: Request, res: Response) => {
    logger.info('DELETE: /:id', { ip: (req as any).clientIp });
    contasController.delete(req, res);
});

export { contaRoute };
