require('dotenv').config();

module.exports = {
     dialect: 'mongodb',
     url: process.env.CONNECTIONSTRING,
     options: {
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
     }

};