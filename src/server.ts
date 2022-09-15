import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'express-async-errors';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(errorHandlerMiddleware)

server.listen(process.env.PORT, () => console.log(`
    Server running on port ${process.env.PORT}.
`));