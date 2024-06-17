import { Knex } from "nestjs-knex";

export interface UserRepository{
    getUser(correo:string, knex?: Knex);
    insert(insert: any);
    getById(id: number, rol: string, trx?: Knex);
    getAll(rol:string);
    dbContext():Promise<Knex>;
}