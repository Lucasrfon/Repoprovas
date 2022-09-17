export type TExam = {
    name: string,
    pdfUrl: string,
    category: string,
    discipline: string,
    teacher: string
}

export type TInsertExam = {
    name: string,
    pdfUrl: string,
    categoryId: number,
    teacherDisciplineId: number
}