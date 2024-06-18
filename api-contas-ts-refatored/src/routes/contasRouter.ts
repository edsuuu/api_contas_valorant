import { Router } from 'express';
import contasController from '../controllers/Contas';

import loginRequired from '../middleware/loginRequired';

const contaRouter: Router = Router();

contaRouter.get('/test', loginRequired, contasController.test);
contaRouter.get('/', loginRequired, contasController.index);
contaRouter.post('/', loginRequired, contasController.store);
contaRouter.put('/:id', loginRequired, contasController.update);
contaRouter.delete('/:id', loginRequired, contasController.delete);

export { contaRouter };
