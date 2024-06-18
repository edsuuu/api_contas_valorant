import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../../models/UserModel';

class TokenController {

    test(req: Request, res: Response) {
        res.json('hello token');
    }

    async store(req: Request, res: Response): Promise<Response> {
        const { email = '', password = '' } = req.body;

        if (!email || !password) {
            return res.status(401).json({ errors: ['Credenciais inválidas'] });
        }

        const user = await UserModel.findOne({ email }).exec();

        if (!user) {
            return res.status(401).json({ errors: ['Usuário não existe'] });
        }

        if (!(await user.passwordIsValid(password))) {
            return res.status(401).json({ errors: ['Senha inválida'] });
        }

        const { id, permission } = user;

        // console.log('User before token generation:', { id, email, permission });

        const token = jwt.sign({ id, email, permission }, process.env.TOKEN_SECRET as string, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.json({ token, user: { nome: user.nome, email, id } });
    }
}

export default new TokenController();
