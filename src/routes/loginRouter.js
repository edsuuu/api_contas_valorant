import { Router } from 'express';
import loginController from '../controllers/LoginController';

const router = new Router();

router.get('/', loginController.store);

export default router;