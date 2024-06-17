import express from 'express';

require('dotenv').config();

import cors from 'cors';
import helmet from 'helmet';

import mongoose from 'mongoose';
import database from './config/database';

import homeRouter from './routes/homeRouter';
import userRouter from './routes/userRouter';
import contasRouter from './routes/contasRouter';
import tokenRouter from './routes/tokenRouter';

const whitelist = [`${process.env.WHITELIST}:${process.env.PORT}`, `${process.env.WHITELIST2}`];

const corsOptions = {
     origin: function (origin, callback) {
          if (whitelist.indexOf(origin) !== -1 || !origin) {
               callback(null, true)
          } else {
               callback(new Error('Not allowed by CORS'))
          }
     }
}

class App {
     constructor() {
          this.app = express();
          this.middlewares();
          this.connectionDB();
          this.routes();
     }

     middlewares() {
          this.app.use(cors(corsOptions));
          this.app.use(helmet());
          this.app.use(express.urlencoded({ extended: true }));
          this.app.use(express.json());
     }

     routes() {
          this.app.use('/', homeRouter);
          this.app.use('/contas/', contasRouter);
          this.app.use('/user/', userRouter)
          this.app.use('/login/', tokenRouter)
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