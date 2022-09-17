import { Request, Response } from "express";
import { insertExam } from "../services/examService";
import { TExam } from "../types/examTypes";

export async function registerNewExam(req: Request, res: Response) {
    const exam: TExam = req.body

    await insertExam(exam);

    res.status(201).send('Prova cadastrada!')
}