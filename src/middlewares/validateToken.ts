import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default function validateToken() {
    return (req: Request, res: Response, next: NextFunction) => {
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer ', '');
        const secret = process.env.TOKEN_SECRET_KEY;
        
        if (!token) {
            throw { type: "unauthorized", message: 'Token necessário' }
        }
        
        if(!secret) {
            throw { type: "code", message: '.env não implementado' }
        }

        const { userId } = jwt.verify(token, secret) as {userId: number}
        res.locals.id = userId;
        
        next();
    }
}