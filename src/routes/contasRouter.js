import { Router } from 'express';
import contasController from '../controllers/ContasController';

const router = new Router();

router.get('/', contasController.index);
router.post('/', contasController.store);
router.put('/:id', contasController.edit);
router.delete('/:id', contasController.delete);

export default router;