import { Router } from 'express';
import adminController from '../controllers/admin';
import loginRequired from '../middleware/loginRequired';
import authorize from '../middleware/authorization';
const adminRoute: Router = Router();

adminRoute.get('/dashboard', loginRequired, authorize('admin'), adminController.dash);

//criar um usuario
adminRoute.post('/users/register/', adminController.criarUser);

//listar todos usuarios
adminRoute.get('/users', loginRequired, adminController.index);

//listar um usuario
adminRoute.get('/users/:id', loginRequired, adminController.show);

//precisa editar o metodo
adminRoute.put('/users/:id', loginRequired, adminController.updateUser);

adminRoute.delete('/users/:id', loginRequired, adminController.deleteUser);

export { adminRoute };
