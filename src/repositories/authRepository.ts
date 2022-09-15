import client from "../dbStrategy/prisma";
import { TypeAuth } from "../utils/types";

export async function findUserByEmail(email: string) {
    const user = await client.users.findFirst({where: { email }});
    return user
}

export async function insertUser(user: TypeAuth) {
    await client.users.create({data: user});
}