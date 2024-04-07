import User from "../models/UserModel";

class UserController {
     async store(req, res) {
          try {
               const dados = new User(req.body);


               const result = await dados.register();

               if (result.errors) {
                    return res.status(400).json({ error: result.errors });
               }

               return res.json(result);
          } catch (e) {
               console.log(e);
               res.status(500).json({ error: 'Erro ao criar uma nova conta !' });
          }
     }

     async login (req, res) {
          try {

               const user = new User(req.body);

               await user.login();

               
               //corrigir a saida de dados, mas ja esta autenticando e fazer loggout e autenticacao via jwt
               res.json(user)
          } catch (e) {
               console.log(e);
               res.status(500).json({ error: 'Erro ao efetuar login' });
          }
     }

     async index(req, res) {
          const conta = await User.listarContas();
          return res.json(conta);
     }
}

export default new UserController();

