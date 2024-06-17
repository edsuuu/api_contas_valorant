import { Request, Response } from 'express';

class FormController {
    index(req: Request, res: Response) {
        res.json('hello FormController');
    }
}

export default new FormController();
