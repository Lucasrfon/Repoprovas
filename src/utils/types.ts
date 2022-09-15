import { users } from "@prisma/client";

export type TypeAuth = Omit<users, 'id'>