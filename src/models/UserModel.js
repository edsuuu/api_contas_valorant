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


export default UserModel;