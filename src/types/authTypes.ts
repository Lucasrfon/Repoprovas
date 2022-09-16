import { users } from "@prisma/client";

export type TAuth = Omit<users, 'id'>