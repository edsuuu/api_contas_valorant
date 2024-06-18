import { Request, Response } from 'express';
import mongoose from 'mongoose';
import UserModel, { IUser } from '../../models/UserModel';
import { IGetUserAuthInfoRequest } from './userTypes';

interface MongoError extends Error {
    code?: number;
    kind?: string;
}

class UserController {

    async test(req: Request, res: Response) {
        // console.log(req);

        return res.status(200).json('ok');
    }

    async store(req: Request, res: Response): Promise<Response> {
        try {

            //persistencia
            if (!req.body.permission) {
                req.body.permission = 'user';
            }

            const novoUsuario = new UserModel(req.body as IUser);

            await novoUsuario.validate();
            await novoUsuario.save();

            const { _id, nome, email, permission } = novoUsuario;

            return res.status(201).json({
                msg: 'Usuário criado com sucesso!',
                novo_usuario: { _id, nome, email, permission }
            });
        } catch (error) {
            const mongoError = error as MongoError;
            if (mongoError instanceof mongoose.Error.ValidationError) {
                const validationErrors = Object.values(mongoError.errors).map(err => (err as mongoose.Error.ValidatorError).message);
                return res.status(400).json({ errors: validationErrors });
            } else if (mongoError.code === 11000) {
                return res.status(400).json({ error: 'Email já existe' });
            } else {
                console.error('Erro ao criar Usuário:', mongoError);
                return res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    }

    async index(req: Request, res: Response): Promise<Response> {
        try {
            const listarUsuarios = await UserModel.find({}, { password_hash: 0, __v: 0 }).exec();
            return res.status(200).json(listarUsuarios);
        } catch (error) {
            return res.status(500).json(null);
        }
    }

    async show(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const listarUsuarios = await UserModel.findById(id, { password_hash: 0, __v: 0 }).exec();
            return res.status(200).json(listarUsuarios);
        } catch (error) {
            return res.status(500).json(null);
        }
    }

    async update(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
        try {


            const atualizarUsuario = await UserModel.findByIdAndUpdate(req.userId, req.body as IUser, { new: true }).exec();

            if (!atualizarUsuario) {
                return res.status(404).json({ errors: ['Conta não encontrada'] });
            }

            const { _id, nome, email } = atualizarUsuario;

            return res.status(200).json({
                msg: 'Usuário atualizado com sucesso!',
                usuario_atualizado: { _id, nome, email }
            });
        } catch (error) {
            const mongoError = error as MongoError;
            console.log(mongoError);
            if (mongoError instanceof mongoose.Error.CastError && mongoError.kind === 'ObjectId') {
                return res.status(400).json({ error: 'Este ID não existe.' });
            } else {
                return res.status(500).json({ error: 'Ocorreu um erro interno.' });
            }
        }
    }

    async delete(req: IGetUserAuthInfoRequest, res: Response): Promise<Response> {
        try {

            if (!req.userId) {
                return res.status(400).json({ errors: ['ID não informado'] });
            }

            const user = await UserModel.findById(req.userId).exec();

            if (!user) {
                return res.status(404).json({ errors: ['Usuário não encontrado'] });
            }

            await UserModel.deleteOne({ _id: req.userId }).exec();

            return res.status(200).json({
                msg: 'Usuário deletado com sucesso',
                usuario_deletado: user.email,
            });
        } catch (error) {
            const mongoError = error as MongoError;
            console.log(mongoError);
            if (mongoError instanceof mongoose.Error.CastError && mongoError.kind === 'ObjectId') {
                return res.status(400).json({ error: 'Este ID não existe.' });
            } else {
                return res.status(500).json({ error: 'Ocorreu um erro interno.' });
            }
        }
    }
}

export default new UserController();
