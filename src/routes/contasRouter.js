import { Router } from 'express';
import contasController from '../controllers/ContasController';

const router = new Router();

router.post('/', contasController.store);


export default router;