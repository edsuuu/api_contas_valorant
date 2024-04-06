import express from 'express';

require('dotenv').config();

import mongoose from 'mongoose';
import database from './src/config/database';

import homeRouter from './src/routes/homeRouter';
import loginRouter from './src/routes/loginRouter';
import contasRouter from './src/routes/contasRouter';



class App {
     constructor() {
          this.app = express();
          this.middlewares();
          this.connectionDB();
          this.routes();
     }

     middlewares() {
          this.app.use(express.urlencoded({ extended: true }));
          this.app.use(express.json());
     }

     routes() {
          this.app.use('/', homeRouter);
          this.app.use('/contas/', contasRouter);
          this.app.use('/login/', loginRouter)
     }

     async connectionDB() {
          try {
               await mongoose.connect(database.url, database.options);
               console.log('Conexão feita com sucesso');
          } catch (err) {
               console.error('Erro ao conectar com o banco', err);
          }
     }
}

export default new App().app;