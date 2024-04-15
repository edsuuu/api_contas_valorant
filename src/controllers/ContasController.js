import ContaModel from "../models/ContaModel";
import mongoose from "mongoose";

class ContaController {
     async store(req, res) {
          try {
               const novaConta = new ContaModel(req.body);

               await novaConta.validate();

               await novaConta.save();

               const { dono_conta, login_conta } = novaConta;

               res.status(201).json({
                    msg: 'Conta cadastrada com sucesso',
                    conta_cadastrada: { dono_conta, login_conta },
               });

          } catch (error) {
               if (error.name === 'ValidationError') {
                    const validationErrors = Object.values(error.errors).map(err => err.message);
                    res.status(400).json({ errors: validationErrors });
               } else if (error.code === 11000) {
                    res.status(400).json({ error: 'Login já existe' });
               } else {
                    console.error('Erro ao criar conta:', error);
                    res.status(500).json({ error: 'Erro interno do servidor' });
               }
          }
     }

     async index(req, res) {
          try {
               const listarContas = await ContaModel.find({}, { senha_conta: 0, __v: 0 });
               return res.status(200).json(listarContas);
          } catch (e) {
               return res.json(null);
          }
     }

     async update(req, res) {
          try {
               const { id } = req.params;

               const contaAtualizada = await ContaModel.findByIdAndUpdate(id, req.body, { new: true });

               if (!contaAtualizada)
                    return res.status(404).json({ errors: ['Conta não encontrada'] });

               const { dono_conta, login_conta, senha_conta } = contaAtualizada;

               return res.status(200).json({
                    msg: 'Conta atualizada com sucesso',
                    conta_atualizada: { dono_conta, login_conta, senha_conta }
               });
          } catch (error) {
               if (error instanceof mongoose.Error.CastError && error.kind === 'ObjectId') {
                    return res.status(400).json({ error: 'Este ID não existe.' });
               } else {

                    return res.status(500).json({ error: 'Ocorreu um erro interno.' });
               }
          }
     }

     async delete(req, res) {
          try {
               const { id } = req.params;

               const conta = await ContaModel.findById(id);

               if (!conta) {
                    return res.status(404).json({ errors: ['Conta não encontrada'] });
               }

               await ContaModel.deleteOne({ _id: id });

               return res.status(200).json({ 
                    msg: 'Conta deletada com sucesso',
                    conta_deletada: conta.login_conta,
                });
          } catch (error) {
               if (error instanceof mongoose.Error.CastError && error.kind === 'ObjectId') {
                    return res.status(400).json({ error: 'Este ID não existe.' });
               } else {
                    return res.status(500).json({ error: 'Ocorreu um erro interno.' });
               }
          }
     }

}

export default new ContaController();
