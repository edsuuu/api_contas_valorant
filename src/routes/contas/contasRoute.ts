import { Router } from 'express';
import contasController from '@/controllers/contas';

import loginRequired from '@/middleware/loginRequired';

const contaRoute: Router = Router();

contaRoute.get('/', loginRequired, contasController.index);
contaRoute.get('/:id', loginRequired, contasController.show);
contaRoute.post('/', loginRequired, contasController.store);
contaRoute.put('/:id', loginRequired, contasController.update);
contaRoute.delete('/:id', loginRequired, contasController.delete);

export { contaRoute };
