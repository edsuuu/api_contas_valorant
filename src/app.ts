import express, { Express } from 'express';
import { homeRoute } from './routes/homeRoute';
import { contaRouter } from './routes/contasRouter';
import { tokenRoute } from './routes/tokenRoute';
import { userRoute } from './routes/userRouter';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

import mongoose from 'mongoose';
import database from './config/db';

dotenv.config();

const whitelist = ['http://example1.com', 'http://example2.com'];

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
        this.connectionDB();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/', homeRoute);
        this.app.use('/api/contas/', contaRouter);
        this.app.use('/api/user/', userRoute);
        this.app.use('/api/login/', tokenRoute);
    }

    async connectionDB() {
        try {
            await mongoose.connect(database.url);
            console.log('[server]: Conexão feita com sucesso');
        } catch (err) {
            console.error('Erro ao conectar com o banco', err);
        }
    }
}

export default new App().app;