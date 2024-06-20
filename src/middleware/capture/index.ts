import { Request, Response, NextFunction } from 'express';

const captureIP = (req: Request, res: Response, next: NextFunction) => {
    let clientIp = req.headers['x-forwarded-for'] as string || req.connection.remoteAddress || '';
    if (clientIp.startsWith('::ffff:')) {
        clientIp = clientIp.substring(7);
    }
    console.log('o ip é ', clientIp);

    // Armazena o IP do cliente no objeto da requisição
    req.clientIp = clientIp;
    next();
};

export default captureIP;
