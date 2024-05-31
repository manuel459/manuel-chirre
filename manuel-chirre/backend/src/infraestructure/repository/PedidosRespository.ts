import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { IPedidosRepository } from "../interfaces/IPedidosRepository";

export class PedidosRepository implements IPedidosRepository {
    constructor(@InjectKnex() private readonly knex: Knex){}
    
    async getAll(nro_pedido: number) {
        const query = this.knex
                          .select('p.numero_pedido',
                                  'p.lista_productos',
                                  'p.fecha_pedido',
                                  'p.fecha_recepcion',
                                  'p.fecha_despacho',
                                  'p.fecha_entrega',
                                  'u_vendedor.nombre as vendedor_solicitante',
                                  'u_repartidor.nombre as repartidor',
                                  'p.estado')
                                .from('pedidos as p')
                                .join('usuarios as u_vendedor', 'p.vendedor_solicitante','u_vendedor.id')
                                .join('usuarios as u_repartidor', 'p.repartidor','u_repartidor.id');

        if(nro_pedido && nro_pedido.toString() != 'null'){
            query.where('numero_pedido',nro_pedido);
        }
        console.log(query.toSQL());
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