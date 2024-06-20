import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import database from './config/db';
import expressWinston from 'express-winston';

import { homeRoute } from './routes/homeRoute';
import { authRoute } from './routes/authRoute';
import { userRoute } from './routes/userRouter';
import { contaRoute } from './routes/contasRoute';
import { adminRoute } from './routes/adminRoute';
import captureIP from './middleware/capture';
import logger from './utils/logger';

dotenv.config();

const whitelist = ['http://localhost:3000', 'http://localhost:5173'];

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
        // this.app.use(expressIp.getIpInfoMiddleware());
        // this.app.use(captureIP)
        this.app.use(expressWinston.logger(logger))
    }

    routes() {
        this.app.use('/api/', homeRoute);
        this.app.use('/api/admin/', adminRoute);
        this.app.use('/api/contas/', contaRoute);
        this.app.use('/api/user/', userRoute);
        this.app.use('/api/login/', authRoute);
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
