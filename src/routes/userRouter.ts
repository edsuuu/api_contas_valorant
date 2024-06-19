import { Router } from 'express';
import userController from '../controllers/user';
import loginRequired from '../middleware/loginRequired';
const userRoute: Router = Router();

userRoute.put('/edit/', loginRequired, userController.update);
userRoute.delete('/', loginRequired, userController.delete);

export { userRoute };

