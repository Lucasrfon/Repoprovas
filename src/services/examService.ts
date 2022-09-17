import dotenv from 'dotenv';
import { findDiscipline, findExamCategory, findExamGroupByDiscipline, findExamGroupByTeacher, findTeacher, findTeacherDiscipline, registerExam } from '../repositories/examRepository';
import { TExam } from '../types/examTypes';
dotenv.config();

export async function insertExam(exam: TExam) {
    const category = await findExamCategory(exam.category);
    const teacher = await findTeacher(exam.teacher);
    const discipline = await findDiscipline(exam.discipline);
    
    if(!category || !teacher || !discipline) {
        throw { type: "not found", message: 'Categoria, instrutor ou matéria não cadastrados'}
    }
    
    const teachersDiscipline = await findTeacherDiscipline(teacher.id, discipline.id);

    if(!teachersDiscipline) {
        throw { type: "not found", message: 'Categoria, instrutor ou matéria não cadastrados'}
    }

    const newExam = {
        name: exam.name,
        pdfUrl: exam.pdfUrl, 
        categoryId: category.id,
        teacherDisciplineId: teachersDiscipline.id
    }
    
    await registerExam(newExam);
}

export async function getAllExamsByDiscipline() {
    return await findExamGroupByDiscipline();
}

export async function getAllExamsByDTeacher() {
    return await findExamGroupByTeacher();
}