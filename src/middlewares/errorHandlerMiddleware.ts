import { Request, Response, NextFunction } from "express";

export default async function errorHandlerMiddleware(error: { type: string, message: string, name: string | undefined}, req: Request, res: Response, next: NextFunction) {


	if(error.type === "unauthorized" || error.name) {
		return res.status(401).send(error.message);
	}

	if(error.type === "not found" || error.name) {
		return res.status(404).send("Não encontrado");
	}

	if(error.type === "conflict") {
		return res.status(409).send(error.message);
	}

	if(error.type === "schema") {
		return res.status(422).send(error.message);
	}

	if(error.type === "code") {
		return res.status(501).send(error.message);
	}
	
	return res.status(500).send(error);
}