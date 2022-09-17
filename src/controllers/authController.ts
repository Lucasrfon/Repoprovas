import { Request, Response } from "express";
import { checkLogin, createUser } from "../services/authService";
import { TAuth } from "../types/authTypes";

export async function signup(req: Request, res: Response) {
    const user = req.body as {email: string, password: string, confirmPassword: string};
    const newUser = {email: user.email, password: user.password};

    await createUser(newUser);

    res.status(201).send('Usuário cadastrado!')
}

export async function login(req: Request, res: Response) {
    const user: TAuth = req.body;

    const token = await checkLogin(user);

    res.status(200).send(token)
}