import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/prisma";
import examFactory from "./factories/examFactory";
import loginFactory from "./factories/loginFactory";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE tests;`;
  });

afterAll(async () => {
    await client.$disconnect();
});

describe('POST /exams', () => {

    it('Sucesso deve retornar 201', async () => {
        const exam = await examFactory();
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password};
        await supertest(app).post("/signup").send(newUser);
        const { text } = await supertest(app).post("/login").send(user);

        const result = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto",
            discipline: "React",
            teacher: "Diego Pinho"
        }).set('Authorization', `Bearer ${text}`);
        const status = result.status;

        expect(status).toBe(201);
    });

    it('Erro no token deve retornar 401', async () => {
        const exam = await examFactory();
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password};
        await supertest(app).post("/signup").send(newUser);
        const { text } = await supertest(app).post("/login").send(user);

        const result = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto",
            discipline: "React",
            teacher: "Diego Pinho"
        }).set('Authorization', `Bear ${text}`);
        const status = result.status;

        const result2 = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto",
            discipline: "React",
            teacher: "Diego Pinho"
        });
        const status2 = result2.status;

        const result3 = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto",
            discipline: "React",
            teacher: "Diego Pinho"
        }).set('Authorization', `Bearer ${text + 123}`);;
        const status3 = result3.status;

        expect(status).toBe(401);
        expect(status2).toBe(401);
        expect(status3).toBe(401);
    });

    it('Schema inconsistente deve retornar 422', async () => {
        const exam = await examFactory();
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password};
        await supertest(app).post("/signup").send(newUser);
        const { text } = await supertest(app).post("/login").send(user);

        const result = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto",
            discipline: "React",
            teacher: "Diego Pinho",
            campoExtra: 123
        }).set('Authorization', `Bearer ${text}`);
        const status = result.status;

        const result2 = await supertest(app).post("/exams").send({}).set('Authorization', `Bearer ${text}`);
        const status2 = result2.status;

        expect(status).toBe(422);
        expect(status2).toBe(422);
    });

    it('Category, discipline ou teacher não cadastrados deve retornar 404', async () => {
        const exam = await examFactory();
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password};
        await supertest(app).post("/signup").send(newUser);
        const { text } = await supertest(app).post("/login").send(user);

        const result = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto123456",
            discipline: "React",
            teacher: "Diego Pinho"
        }).set('Authorization', `Bearer ${text}`);
        const status = result.status;

        const result2 = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto",
            discipline: "React123456",
            teacher: "Diego Pinho"
        }).set('Authorization', `Bearer ${text}`);
        const status2 = result2.status;

        const result3 = await supertest(app).post("/exams").send({
            ...exam,
            category: "Projeto",
            discipline: "React",
            teacher: "Diego Pinho123456"
        }).set('Authorization', `Bearer ${text}`);
        const status3 = result3.status;

        expect(status).toBe(404);
        expect(status2).toBe(404);
        expect(status3).toBe(404);
    });
});

// describe('GET /exams/discipline', () => {
//     it('Sucesso deve retornar 200', async () => {

//         const result = await supertest(app).post("/exams").send();
//         const status = result.status;

//         expect(status).toBe(200);
//     });
// });

// describe('GET /exams/teacher', () => {
//     it('Sucesso deve retornar 200', async () => {

//         const result = await supertest(app).post("/exams").send();
//         const status = result.status;

//         expect(status).toBe(200);
//     });
// });