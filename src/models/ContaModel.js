import mongoose from 'mongoose';

const ContasSchema = new mongoose.Schema({
     dono_conta: {
          type: String,
          default: '',
          required: [true, 'O campo dono da conta é obrigatorio'],
          validate: {
               validator: function (v) {
                    return v.length >= 3 && v.length <= 255;
               },
               message: 'Campo dono conta tem que ter entre 3 a 255 caracteres'
          },
          trim: true,
     },
     login_conta: {
          type: String,
          default: '',
          required:[true, 'O campo login é obrigatorio'],
          trim: true,
          unique: true,
          validate: {
               validator: function (v) {
                    return v.length >= 3 && v.length <= 20;
               },
               message: 'Campo login tem que ter entre 3 a 20 caracteres'
          },
     },
     senha_conta: {
          type: String,
          default: '',
          required: [true, 'O campo senha é obrigatorio'],
          trim: true,
          validate: {
               validator: function (v) {
                    return v.length >= 3 && v.length <= 20;
               },
               message: 'Campo senha tem que ter entre 3 a 20 caracteres'
          },
     },
});

const ContaModel = mongoose.model('contas', ContasSchema);

export default ContaModel;