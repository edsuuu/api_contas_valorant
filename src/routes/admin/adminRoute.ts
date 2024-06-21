import { Router } from 'express';
import adminController from '@/controllers/admin';
import loginRequired from '@/middleware/loginRequired';
import authorize from '@/middleware/authorization';
const adminRoute: Router = Router();

adminRoute.get('/dashboard', loginRequired, authorize('admin'), adminController.dash);

//listar todos usuarios
adminRoute.get('/users', loginRequired, authorize('admin'), adminController.index);

//listar um usuario
adminRoute.get('/user/:id', loginRequired, authorize('admin'), adminController.show);

//criar um usuario
adminRoute.post('/user/register/', authorize('admin'), adminController.criarUser);

//precisa editar o metodo
adminRoute.put('/user/edit/:id', loginRequired, authorize('admin'), adminController.updateUser);

//deletar usuario
adminRoute.delete('/user/:id', loginRequired, authorize('admin'), adminController.deleteUser);

export { adminRoute };
