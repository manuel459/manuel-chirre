import { Knex } from "knex";
import { GetAllPedidosDto } from "src/interfaces/dto/get-all-pedidos.dto";

export interface PedidosRepository {
    create(body, trx?: Knex);
    getById(id: number);
    update(id: number, body: any);
    getAll(payload:GetAllPedidosDto);
    createDetail(body, trx?: Knex);
    getByIdDetail(numero_pedido: number);
}