import express from 'express';

require('dotenv').config();

import mongoose from 'mongoose';
import database from './config/database';

import homeRouter from './routes/homeRouter';
import userRouter from './routes/userRouter';
import contasRouter from './routes/contasRouter';
import tokenRouter from './routes/tokenRouter';

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
          this.app.use('/user/', userRouter)
          this.app.use('/tokens/', tokenRouter)
     }

     async connectionDB() {
          try {
               await mongoose.connect(database.url);
               console.log('Conexão feita com sucesso');
          } catch (err) {
               console.error('Erro ao conectar com o banco', err);
          }
     }
}

export default new App().app;