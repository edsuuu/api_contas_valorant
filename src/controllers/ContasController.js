import Conta from "../models/ContaModel";

class ContaController {
     async store(req, res) {
          try {
               // const dados = await Conta.create(req.body);
               const dados = new Conta(req.body);
               const result = await dados.register();

               if (result.errors) {
                    return res.status(400).json({ error: result.errors });
               }

               return res.json(result);
          } catch (e) {
               console.log(e);
               res.status(500).json({ error: 'Erro ao criar uma nova conta' });
          }
     }
     async index(req, res) {
          const conta = await Conta.listarContas();
          return res.json(conta);
     }

     async edit(req, res) {
          const { id } = req.params;
          const conta = new Conta(req.body);
          await conta.editarConta(id);
          return res.json({ msg: 'Conta editada com sucesso' });
     }

     async delete(req, res) {
          try {
               const { id } = req.params;

               const deletarConta = await Conta.delete(id);

               if (!deletarConta) {
                    return res.status(400).json({ error: 'Conta não encontrada' });
               }

               return res.json({ msg: 'Conta deletada com sucesso' });
          } catch (error) {
               console.log(error);
               return res.status(500).json({ error: 'Erro ao deletar a conta' });
          }
     }

}

export default new ContaController();
