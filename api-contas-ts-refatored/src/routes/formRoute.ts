import { Router } from 'express';
import FormController from '../controllers/Form';

const formRoute: Router = Router();

formRoute.get('/', FormController.index);

export { formRoute };
