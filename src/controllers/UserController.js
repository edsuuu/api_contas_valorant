import UserModel from "../models/UserModel";

class UserController {
     async store(req, res) {
          try {
               const novoUsuario = new UserModel(req.body);

               await novoUsuario.validate();

               await novoUsuario.save();

               res.status(201).json({
                    msg: 'Usuário criado com sucesso !'
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
               const listarUsuarios = await UserModel.find({})//,{ password: 0, __v: 0 });

               return res.json(listarUsuarios);
          } catch (e) {
               return res.json(null);
          }
     }

}

export default new UserController();

