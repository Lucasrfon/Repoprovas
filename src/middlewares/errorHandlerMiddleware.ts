import { Request, Response, NextFunction } from "express";

export default async function errorHandlerMiddleware(error: { type: string, message: string, name: string | undefined}, req: Request, res: Response, next: NextFunction) {

	return res.status(500).send(error);
}