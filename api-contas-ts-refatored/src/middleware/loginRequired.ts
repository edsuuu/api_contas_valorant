import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    email: string;
}

interface CustomRequest extends Request {
    userId?: string;
    userEmail?: string;
  }

export default (req: Request, res: Response, next: NextFunction): Response | void => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ error: 'Login required' });

    const [, token] = authorization.split(' ');

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayload;
        const { id, email } = dados;
        console.log(dados);

        (req as CustomRequest).userId = id;
        (req as CustomRequest).userEmail = email;

        return next();
    } catch (e) {
        return res.status(401).json({ error: 'Token Invalido' });
    }
}
