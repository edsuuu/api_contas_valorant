import { Router } from 'express';
import tokenController from '../controllers/token';

const tokenRoute: Router = Router();

tokenRoute.get('/', tokenController.test);
// tokenRoute.get('/', tokenController.store);

export { tokenRoute };
