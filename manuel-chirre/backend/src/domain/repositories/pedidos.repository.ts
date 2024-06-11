import { GetAllPedidosDto } from "src/interfaces/dto/get-all-pedidos.dto";

export interface PedidosRepository {
    create(body);
    getById(id: number);
    update(id: number, body: any);
    getAll(payload:GetAllPedidosDto);
    createDetail(body);
    getByIdDetail(numero_pedido: number);
}