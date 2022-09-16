import { users } from "@prisma/client";

export type TypeAuth = Omit<users, 'id'>

export type TypeExam = {
    name: string,
    PDFLink: string,
    category: string,
    subject: string,
    teacher: string
}