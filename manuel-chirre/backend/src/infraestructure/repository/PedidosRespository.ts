import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { IPedidosRepository } from "../interfaces/IPedidosRepository";

export class PedidosRepository implements IPedidosRepository {
    constructor(@InjectKnex() private readonly knex: Knex){}
    
    async getAll(nro_pedido: number) {
        const query = this.knex('pedidos').select();
        if(nro_pedido && nro_pedido.toString() != 'null'){
            query.where('numero_pedido',nro_pedido);
        }
        return await query;
    }

    async getById(id: number) {
        return await this.knex('pedidos').where('numero_pedido', id).first();
    }

    async create(body){
        return await this.knex('pedidos').insert(body);
    }

    async update(id: number, body: any){
        return await this.knex('pedidos').where('numero_pedido', id).update(body);
    }
}