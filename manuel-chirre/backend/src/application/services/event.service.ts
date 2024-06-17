import { Injectable } from "@nestjs/common";
import { CreatePedidoDto } from "src/interfaces/dto/create-pedido.dto";
import { PedidosServices } from "./pedidos.service";
import { PostgresqlUserRepository } from "src/infraestructure/persistence/postgresql.users.repository";
import { PostgresqlProductosRepository } from "src/infraestructure/persistence/postgresql.productos.repository";
import { PostgresqlPedidosRepository } from "src/infraestructure/persistence/postgresql.pedidos.respository";

@Injectable()
export class EventService {
    pedidosServices: PedidosServices
    constructor(private userRepository: PostgresqlUserRepository, 
                private productosRepository: PostgresqlProductosRepository, 
                private pedidosRespository: PostgresqlPedidosRepository){
        this.pedidosServices = new PedidosServices(productosRepository, userRepository, pedidosRespository);
    }

    async createPedidoCron(payload: CreatePedidoDto){
        return await this.pedidosServices.create(payload);
    }
}