import { Router } from 'express';
import userController from '../controllers/user';
import loginRequire from '../middleware/loginRequire';

const userRoute: Router = Router();

userRoute.get('/', userController.test);
// userRoute.get('/', userController.index);
// userRoute.post('/cadastro/', userController.store);
// userRoute.get('/:id', userController.show);
// userRoute.put('/edit/', userController.update);
// userRoute.delete('/', userController.delete);


export { userRoute };

