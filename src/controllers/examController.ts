import { Request, Response } from "express";
import { getAllExamsByDiscipline, insertExam } from "../services/examService";
import { TExam } from "../types/examTypes";

export async function registerNewExam(req: Request, res: Response) {
    const exam: TExam = req.body

    await insertExam(exam);

    res.status(201).send('Prova cadastrada!')
}

export async function getExamsGroupByDiscipline(req: Request, res: Response) {
    const examsGroupByDiscipline = await getAllExamsByDiscipline();

    res.status(200).send(examsGroupByDiscipline);
}