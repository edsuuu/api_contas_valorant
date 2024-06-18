import { Router } from 'express';
import userController from '../controllers/user';
import loginRequired from '../middleware/loginRequired';
import authorize from '../middleware/authorization';
const userRoute: Router = Router();

userRoute.get('/test', loginRequired, authorize('admin'),  userController.test);
userRoute.post('/cadastro/', userController.store);
//ver contas listadas
userRoute.get('/', loginRequired,  userController.index);
// userRoute.get('/:id', loginRequired, userController.show);
userRoute.put('/edit/', loginRequired, userController.update);
userRoute.delete('/', loginRequired, userController.delete);

export { userRoute };

