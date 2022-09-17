import { Request, Response } from "express";
import { getAllExamsByDiscipline, getAllExamsByTeacher, insertExam } from "../services/examService";
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

export async function getExamsGroupByTeacher(req: Request, res: Response) {
    const examsGroupByTeacher = await getAllExamsByTeacher();

    res.status(200).send(examsGroupByTeacher);
}