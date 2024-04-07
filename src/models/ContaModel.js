import mongoose from 'mongoose';

const ContasSchema = new mongoose.Schema({
     dono: {
          type: String,
          required: true,
     },
     login: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     }
})

const ContaModel = mongoose.model('contas', ContasSchema);

class Conta {
     constructor(body) {
          this.body = body;
          this.errors = [];
          this.model = ContaModel;

     }

     async register() {

          if (!this.body.dono && !this.body.login && !this.body.password) {
               return {
                    errors: ['Todos os campos precisa ser preenchido']
               }
          }

          if (!this.body.dono) return { errors: ['Campo Dono precisa ser preenchido'] }
          if (!this.body.login) return { errors: ['Campo Login precisa ser preenchido'] }
          if (!this.body.password) return { errors: ['Campo Senha precisa ser preenchido'] }


          if (await this.loginExiste() === true) return { msg: ['Essa conta já está cadastrada'] }

          try {
               this.conta = await new ContaModel(this.body).save();
               return this.conta;
          } catch (error) {
               return {
                    error: 'Erro ao salvar a conta no banco de dados'
               };
          }
     }

     async loginExiste() {
          const contaExistente = await ContaModel.findOne({ login: this.body.login });
          return !!contaExistente;
     }

     static async listarContas() {
          const conta = await ContaModel.find();
          return conta;
     }

     async editarConta(id) {
          const conta = await ContaModel.findByIdAndUpdate(id, this.body, { new: true });
          return conta;
     }

     static async delete(id) {
          if (typeof id !== 'string') return;
          
          const contaExistente = await ContaModel.findById(id);
          if (!contaExistente) {
               return null; // Conta não existe, então retornamos null
          }
          const conta = await ContaModel.findOneAndDelete({ _id: id });


          return conta;
     }

}

export default Conta;