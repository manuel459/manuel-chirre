import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { IPedidosRepository } from "../interfaces/IPedidosRepository";
import { getAllPedidosObject } from "src/application/dto/getAllPedidosObject";

export class PedidosRepository implements IPedidosRepository {
    constructor(@InjectKnex() private readonly knex: Knex){}
    
    async getAll(payload: getAllPedidosObject) {
        const query = this.knex
                          .select('p.numero_pedido',
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

        if(payload.nro_pedido && payload.nro_pedido.toString() != 'null'){
            query.where('numero_pedido',payload.nro_pedido);
        }
        if(payload.tipo_fecha && payload.tipo_fecha.toString() != 'null' && payload.fecha_inicio && payload.fecha_inicio.toString() != 'null' && payload.fecha_fin && payload.fecha_fin.toString() != 'null'){
            console.log(payload.fecha_inicio);
            console.log(payload.fecha_fin)
            query.whereRaw(`${payload.tipo_fecha}::DATE between '${payload.fecha_inicio}' and '${payload.fecha_fin}'`);
        }
        console.log(query.toSQL());
        return await query;
    }

    async getById(id: number) {
        return await this.knex('pedidos').where('numero_pedido', id).first();
    }

    async create(body){
        const insert = await this.knex('pedidos').insert(body).returning('numero_pedido');
        return insert[0];
    }

    async update(id: number, body: any){
        return await this.knex('pedidos').where('numero_pedido', id).update(body);
    }

    async createDetail(body: any) {
        return await this.knex('detalle_pedido').insert(body);
    }

    async getByIdDetail(numero_pedido: number){
        return await this.knex('detalle_pedido as dp')
                        .join('productos as p', 'dp.sku', 'p.sku')
                        .where('dp.numero_pedido', numero_pedido)
                        .select('dp.numero_pedido', 'dp.sku', 'p.nombre', 'p.tipo','p.etiquetas', 'p.precio', 'dp.cantidad', this.knex.raw('p.precio * dp.cantidad as total'));
    }
}