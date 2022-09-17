import client from "../dbStrategy/prisma";
import { TInsertExam } from "../types/examTypes";

export async function findExamCategory(discipline: string) {
    return await client.categories.findFirst({ where: { name: discipline } });
}

export async function findDiscipline(discipline: string) {
    return await client.disciplines.findFirst({ where: { name: discipline } });
}

export async function findTeacher(teacher: string) {
    return await client.teachers.findFirst({ where: { name: teacher } });
}

export async function findTeacherDiscipline(teacherId: number, disciplineId: number) {
    return await client.teachersDisciplines.findFirst({ where: { teacherId, disciplineId } });
}

export async function registerExam(exam: TInsertExam) {
    return await client.tests.create({data: exam});
}