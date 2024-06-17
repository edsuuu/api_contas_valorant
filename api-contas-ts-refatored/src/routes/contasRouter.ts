import { Router } from 'express';
import contasController from '../controllers/Contas';

import loginRequired from '../middleware/loginRequire';

const contaRouter: Router = Router();

contaRouter.get('/', contasController.test);
// contaRouter.get('/', contasController.index);
// contaRouter.post('/', contasController.store);
// contaRouter.put('/:id', contasController.update);
// contaRouter.delete('/:id', contasController.delete);

export { contaRouter };
