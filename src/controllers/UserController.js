import UserModel from "../models/UserModel";
import mongoose from "mongoose";

class UserController {
     async store(req, res) {
          try {
               const novoUsuario = new UserModel(req.body);

               await novoUsuario.validate();

               await novoUsuario.save();

               const { _id, nome, email } = novoUsuario;

               res.status(201).json({
                    msg: 'Usuário criado com sucesso !',
                    novo_usuario: { _id, nome, email }

               });

          } catch (error) {
               if (error.name === 'ValidationError') {
                    const validationErrors = Object.values(error.errors).map(err => err.message);
                    res.status(400).json({ errors: validationErrors });
               } else if (error.code === 11000) {
                    res.status(400).json({ error: 'Email já existe' });
               } else {
                    console.error('Erro ao criar Usuário:', error);
                    res.status(500).json({ error: 'Erro interno do servidor' });
               }
          }
     }

     async index(req, res) {
          try {
               const listarUsuarios = await UserModel.find({}, { password_hash: 0, __v: 0 });

               return res.status(200).json(listarUsuarios);
          } catch (e) {
               return res.json(null);
          }
     }

     async show(req, res) {
          try {
               const { id } = req.params;

               const listarUsuarios = await UserModel.findById(id, { password_hash: 0, __v: 0 });

               return res.status(200).json(listarUsuarios);
          } catch (e) {
               return res.json(null);
          }
     }

     async update(req, res) {
          try {

               console.log(req.userId);

               const atualizarUsuario = await UserModel.findByIdAndUpdate(req.userId, req.body, { new: true });

               if (!atualizarUsuario)
                    return res.status(404).json({ errors: ['Conta não encontrada'] });

               const { _id, nome, email } = atualizarUsuario;

               return res.status(200).json( {
                    msg: 'Usuário atualizado com sucesso !',
                    usuario_atualizado: { _id, nome, email }
               });
          } catch (error) {
               console.log(error);
               if (error instanceof mongoose.Error.CastError && error.kind === 'ObjectId') {
                    return res.status(400).json({ error: 'Este ID não existe.' });
               } else {

                    return res.status(500).json({ error: 'Ocorreu um erro interno.' });
               }
          }
     }

     async delete(req, res) {
          try {

               if (!req.userId) {
                    return res.status(400).json({ errors: ['ID não informado'] });
               }

               const user = await UserModel.findById(req.userId);

               if (!user) {
                    return res.status(404).json({ errors: ['Usuário não encontrado'] });
               }

               await UserModel.deleteOne({ _id: req.userId });

               return res.status(200).json({
                    msg: 'Usuário deletado com sucesso',
                    usuario_deletado: user.email,
               });
          } catch (error) {
               console.log(error);
               if (error instanceof mongoose.Error.CastError && error.kind === 'ObjectId') {
                    return res.status(400).json({ error: 'Este ID não existe.' });
               } else {
                    return res.status(500).json({ error: 'Ocorreu um erro interno.' });
               }
          }
     }
}

export default new UserController();

