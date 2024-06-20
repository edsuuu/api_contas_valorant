import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';

import fs from 'fs';

const dailyRotateFileTransport = new DailyRotateFile({
    filename: path.join(__dirname, '../../log', 'data-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
});

// Definindo a interface para meta
interface Meta {
    ip?: string;
}

// Configurar o logger do winston
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, ...meta }: winston.Logform.TransformableInfo & Meta) => {
            return `${timestamp} ${level}: ${message} - IP: ${meta.ip ? meta.ip : 'N/A'}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        dailyRotateFileTransport,
    ],
});

export default logger;
