import { Knex } from "nestjs-knex";

export interface UserRepository{
    getUser(correo:string, knex?: Knex);
    insert(insert: any);
    getById(id: number, rol: string);
    getAll(rol:string);
}