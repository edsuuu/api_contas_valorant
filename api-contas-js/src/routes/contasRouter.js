import { Router } from 'express';
import contasController from '../controllers/ContasController';

import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.get('/', loginRequired, contasController.index);
router.post('/', loginRequired, contasController.store);
router.put('/:id', loginRequired, contasController.update);
router.delete('/:id', loginRequired, contasController.delete);

export default router;