import { Router } from 'express';
import userController from '../controllers/user';
import loginRequired from '../middleware/loginRequired';

const userRoute: Router = Router();

userRoute.get('/test', loginRequired, userController.test);
userRoute.post('/cadastro/', userController.store);
//ver contas listadas
// userRoute.get('/', loginRequired, userController.index);
// userRoute.get('/:id', loginRequired, userController.show);
userRoute.put('/edit/', loginRequired, userController.update);
userRoute.delete('/', loginRequired, userController.delete);

export { userRoute };

