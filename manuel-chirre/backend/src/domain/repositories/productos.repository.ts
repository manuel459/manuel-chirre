import { Knex } from "knex";

export interface ProductosRepository {
    getById(SKU:string, trx?: Knex);
    getAll(sku: string, nombre: string);
    dbContext():Promise<Knex>;
}