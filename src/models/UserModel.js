import mongoose from 'mongoose';
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
     nome: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     }
})

const UserModel = mongoose.model('user', userSchema);

class User {
     constructor(body) {
          this.body = body;
          this.errors = [];
          this.model = UserModel;
          this.user = null;

     }

     async login() {
          this.valida();
          if (this.errors.length > 0) return;
          this.user = await UserModel.findOne({ email: this.body.email });

          if (!this.user) {
               this.errors.push('Usuário não existe.');
               return;
          }

          if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
               this.errors.push('Senha inválida');
               this.user = null;
               return;
          }
     }

     valida() {

          if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido');

          if (this.body.password.length < 3 || this.body.password.length > 50) {
               this.errors.push('A senha precisa ter entre 6 e 50 caracteres.');
          }

     }

     async register() {

          if (!this.body.nome && !this.body.email && !this.body.password) {
               return {
                    errors: ['Todos os campos precisa ser preenchido']
               }
          }

          if (!this.body.nome) return { errors: ['Campo Nome precisa ser preenchido'] }
          if (!this.body.email) return { errors: ['Campo E-mail precisa ser preenchido'] }
          if (!this.body.password) return { errors: ['Campo Senha precisa ser preenchido'] }

          if (await this.loginExiste() === true) return { msg: ['Essa conta já está cadastrada'] }

          try {
               if (!validator.isEmail(this.body.email)) return { errors: ['E-mail inválido'] };
               if (this.body.password.length < 3 || this.body.password.length > 20) return { errors: ['A senha precisa ter entre 6 e 50 caracteres.'] };

               const salt = bcryptjs.genSaltSync();
               this.body.password = bcryptjs.hashSync(this.body.password, salt);

               this.user = await new UserModel(this.body).save();
               return this.user;
          } catch (error) {
               return {
                    error: 'Erro ao criar a conta'
               };
          }
     }

     async loginExiste() {
          const emailExistente = await UserModel.findOne({ email: this.body.email });
          return !!emailExistente;
     }

     static async listarContas() {
          const conta = await UserModel.find();
          return conta;
     }

     async editarUser(id) {
          const conta = await UserModel.findByIdAndUpdate(id, this.body, { new: true });
          return conta;
     }

     static async delete(id) {
          if (typeof id !== 'string') return;

          const contaExistente = await UserModel.findById(id);
          if (!contaExistente) {
               return null;
          }
          const conta = await UserModel.findOneAndDelete({ _id: id });

          return conta;
     }

}

export default User;