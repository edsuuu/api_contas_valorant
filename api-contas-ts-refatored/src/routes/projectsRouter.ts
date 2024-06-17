import { Router } from 'express';
import ProjectsController from '../controllers/Project';

const projectsRoute: Router = Router();

projectsRoute.get('/', ProjectsController.index);

export { projectsRoute };
