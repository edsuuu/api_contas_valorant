import { Router } from 'express';
import userController from '../controllers/UserController';

const router = new Router();


router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/cadastro/', userController.store);
router.put('/edit/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;