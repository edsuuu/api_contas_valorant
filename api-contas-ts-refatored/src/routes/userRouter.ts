import { Router } from 'express';
import userController from '../controllers/user';
import loginRequire from '../middleware/loginRequire';

const userRoute: Router = Router();

userRoute.get('/test', userController.test);
userRoute.post('/cadastro/', userController.store);
userRoute.get('/', userController.index);
userRoute.get('/:id', userController.show);
userRoute.put('/edit/:id', userController.update);
userRoute.delete('/:id', userController.delete);

export { userRoute };

