import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const UserSchema = new mongoose.Schema({
     nome: {
          type: String,
          default: '',
          required: [true, 'Campo nome é obrigatorio'],
          validate: {
               validator: function (v) {
                    return v.length >= 3 && v.length <= 255;
               },
               message: 'Campo nome precisa ter entre 3 a 255 caracteres'
          },
          trim: true,
     },
     email: {
          type: String,
          default: '',
          required: [true, 'Campo e-mail é obrigatorio'],
          unique: true,
          validate: {
               validator: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
               message: 'Email inválido',
          },
     },
     password_hash: {
          type: String,
          default: '',
     },
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    if (password.length < 6 || password.length >= 30) {
      throw new Error('Campo senha tem que ter entre 6 a 30 caracteres');
    }
    this.password_hash = bcryptjs.hashSync(password, 10);
  })
  .get(function () {
    return this._password;
  });

  UserSchema.pre('save', async function (next) {
     if (this.isModified('password')) {
       this.password_hash = await bcryptjs.hash(this.password, 10);
     }
     next();
   });

UserSchema.methods.passwordIsValid = async function (password) {
  return bcryptjs.compare(password, this.password_hash);
};

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;