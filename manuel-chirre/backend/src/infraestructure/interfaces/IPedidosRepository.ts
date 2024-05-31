export interface IPedidosRepository {
    create(body);
    getById(id: number);
    update(id: number, body: any);
    getAll(nro_pedido:number);
}