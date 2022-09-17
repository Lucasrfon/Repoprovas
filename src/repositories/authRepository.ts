import client from "../dbStrategy/prisma";
import { TAuth } from "../types/authTypes";

export async function findUserByEmail(email: string) {
    const user = await client.users.findFirst({where: { email }});
    return user
}

export async function insertUser(user: TAuth) {
    await client.users.create({data: user});
}