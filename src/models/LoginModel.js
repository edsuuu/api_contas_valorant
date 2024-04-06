import mongoose from 'mongoose';

const ContasSchema = new mongoose.Schema({
     nome: {
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

const UserModel = mongoose.model('user', ContasSchema);

class User {
     

}

export default User;