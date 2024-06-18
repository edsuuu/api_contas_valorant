import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    userId?: string;
    userEmail?: string;
    userPermission?: string;
}

const authorize = (requiredPermission: string) => {
    return (req: CustomRequest, res: Response, next: NextFunction): Response | void => {

        console.log('Required Permission:', requiredPermission);
        console.log('User ID:', req.userId);
        console.log('User ID:', req.userEmail);
        console.log('User ID:', req.userPermission);

        try {
            if (req.userPermission === requiredPermission) {
                console.log('passei')
                next();
            } else {
                console.log('nao passei')
                res.status(403).send('Access denied');
            };


        } catch (error) {
            console.log(error)
            res.status(403).send('Access denied');
        }

    };
};

export default authorize;
