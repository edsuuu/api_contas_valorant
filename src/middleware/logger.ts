import path from 'path';
import DailyRotateFile from 'winston-daily-rotate-file';
import winston from 'winston';

interface Meta {
    ip?: string;
}

// rotação de arquivos diários
const dailyRotateFileTransport = new DailyRotateFile({
    filename: path.join(__dirname, '../../log', 'data-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d',
});

// config do logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }: winston.Logform.TransformableInfo & Meta) => {
            return `${timestamp} ${level}: ${message}}`;
        }),
    ),
    transports: [new winston.transports.Console(), dailyRotateFileTransport],
});

export default logger;
