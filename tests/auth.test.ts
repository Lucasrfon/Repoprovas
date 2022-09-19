import supertest from "supertest";
import app from "../src/app";
import client from "../src/dbStrategy/prisma";
import loginFactory from "./factories/loginFactory";

beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE users;`;
  });

afterAll(async () => {
    await client.$disconnect();
});

describe('POST /signup', () => {
    
    it('Sucesso deve retornar status 201', async () => {
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password}

        const result = await supertest(app).post("/signup").send(newUser);
        const status = result.status;

        expect(status).toBe(201)
    });

    it('Schema incompleto deve retornar 422', async () => {
        const user = {};

        const result = await supertest(app).post("/signup").send(user);
        const status = result.status;

        expect(status).toBe(422);
        expect(result.body).toBeInstanceOf(Object);
    });

    it('Email já cadastrado deve retornar 409', async () => {
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password}
        await supertest(app).post("/signup").send(newUser);

        const result = await supertest(app).post("/signup").send(newUser);
        const status = result.status;

        expect(status).toBe(409);
        expect(result.body).toBeInstanceOf(Object);
    });
});

// describe('POST /login', () => {
//     it('token inválido, deveria retornar 401', async () => {

//         const result = await supertest(app).post("/login").send();
//         const status = result.status;

//         expect(status).toBe(500)    
//     });
// });