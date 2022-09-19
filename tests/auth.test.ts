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
        const newUser = {...user, confirmPassword: user.password};

        const result = await supertest(app).post("/signup").send(newUser);
        const status = result.status;

        expect(status).toBe(201)
    });

    it('Schema inconsistente deve retornar 422', async () => {
        const user = await loginFactory();
        const user2 = {};
        const user3 = {...user, confirmPassword: user.password + 123};
        const user4 = {...user, confirmPassword: user.password, campoExtra: 123};

        const result = await supertest(app).post("/signup").send(user);
        const status = result.status;

        const result2 = await supertest(app).post("/signup").send(user2);
        const status2 = result2.status;
        
        const result3 = await supertest(app).post("/signup").send(user3);
        const status3 = result3.status;

        const result4 = await supertest(app).post("/signup").send(user4);
        const status4 = result4.status;
        
        expect(status).toBe(422);
        expect(status2).toBe(422);
        expect(status3).toBe(422);
        expect(status4).toBe(422);
    });

    it('Email já cadastrado deve retornar 409', async () => {
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password};
        await supertest(app).post("/signup").send(newUser);

        const result = await supertest(app).post("/signup").send(newUser);
        const status = result.status;

        expect(status).toBe(409);
    });
});

describe('POST /login', () => {

    it('Sucesso deve retornar status 200', async () => {
        const user = await loginFactory();
        const newUser = {...user, confirmPassword: user.password};
        await supertest(app).post("/signup").send(newUser);

        const result = await supertest(app).post("/login").send(user);
        const status = result.status;

        expect(status).toBe(200); 
    });

    it('Schema inconsistente deve retornar 422', async () => {
        const user = await loginFactory();
        const user2 = {};
        const user3 = {...user, confirmPassword: user.password + 123};

        const result2 = await supertest(app).post("/signup").send(user2);
        const status2 = result2.status;
        
        const result3 = await supertest(app).post("/signup").send(user3);
        const status3 = result3.status;
        
        expect(status2).toBe(422);
        expect(status3).toBe(422);
    });

    it('Email inválido deve retornar 401', async () => {
        const user = await loginFactory();

        const result = await supertest(app).post("/login").send(user);
        const status = result.status;

        expect(status).toBe(401);
    });

    it('Senha inválida deve retornar 401', async () => {
        const user = await loginFactory();

        const newUser = {...user, confirmPassword: user.password};
        await supertest(app).post("/signup").send(newUser);

        const result = await supertest(app).post("/login").send({...user, password: user.password + 123});
        const status = result.status;

        expect(status).toBe(401);   
    });
});