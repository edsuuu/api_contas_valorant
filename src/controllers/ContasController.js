import ContaModel from "../models/ContaModel";

class ContaController {
     async store(req, res) {
          try {
               const novaConta = new ContaModel(req.body);

               await novaConta.validate();

               await novaConta.save();

               res.status(201).json({
                    msg: 'Conta criada com sucesso'
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

}

export default new ContaController();
