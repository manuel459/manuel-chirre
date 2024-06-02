import { getAllPedidosObject } from "src/application/dto/getAllPedidosObject";

export interface IPedidosRepository {
    create(body);
    getById(id: number);
    update(id: number, body: any);
    getAll(payload:getAllPedidosObject);
    createDetail(body);
    getByIdDetail(numero_pedido: number);
}