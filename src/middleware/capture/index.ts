import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    clientIp?: string;
}

export const ipMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.connection.remoteAddress || req.socket.remoteAddress;
    req.clientIp = clientIp;
    next();
};
