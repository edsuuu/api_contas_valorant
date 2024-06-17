import { Request, Response } from 'express';

class ProjectsController {
    index(req: Request, res: Response) {
        res.json('hello ProjectsController');
    }
}

export default new ProjectsController();
