import { Router } from 'express';
import tokenController from '../controllers/token';

const tokenRoute: Router = Router();

tokenRoute.get('/test', tokenController.test);
tokenRoute.post('/', tokenController.store);

export { tokenRoute };
