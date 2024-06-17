import { Router } from 'express';
import userController from '../controllers/UserController';

import loginRequired from '../middleware/loginRequired';

const router = new Router();

router.post('/cadastro/', userController.store);

router.get('/', loginRequired, userController.index);
router.get('/:id', loginRequired, userController.show);

router.put('/edit/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;