import { ProductosRepository } from "src/domain/repositories/productos.repository";
import { ResponseHandler } from "../../shared/responses/response";
import { HttpException } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { PedidosRepository } from "src/domain/repositories/pedidos.repository";
import { GetAllPedidosDto } from "src/interfaces/dto/get-all-pedidos.dto";
import { ResponseInterface } from "src/shared/interfaces/response.interface";
import { CreatePedidoDto } from "src/interfaces/dto/create-pedido.dto";
import { EN_DELIVERY, EN_PROCESO, RECIBIDO, REPARTIDOR, VENDEDOR, lista_secuencia_estados } from "src/shared/constants/constantes";
import { UpdateProcessStateDto } from "src/interfaces/dto/update-process-state.dto";
import * as AWS from 'aws-sdk';

export class PedidosServices {
    constructor(private readonly _productRepository: ProductosRepository, private _userRepository: UserRepository, private _pedidosRepository :PedidosRepository){

    }

    async getAll(payload: GetAllPedidosDto): Promise<ResponseInterface>{
        const response = new ResponseHandler();
        try {
            const result = await this._pedidosRepository.getAll(payload);
            return response.succest(200, 'consulta exitosa', result);
        }catch(error){
            return response.error(error.status??400, error.message);
        }
    }

    async create(create: CreatePedidoDto): Promise<ResponseInterface>{
        const response = new ResponseHandler();
        try {
            const context = await this._productRepository.dbContext();
            return context.transaction(async (txr) => {
                for(let item of create.lista_productos){
                    const product = await this._productRepository.getById(item.sku, txr)
                    if(!product) throw new HttpException('No se encontraron registros del producto', 400)
                }
                
                const vendedor = await this._userRepository.getById(create.vendedor_solicitante, VENDEDOR, txr)
                console.log('datos', vendedor)
                if(!vendedor) throw new HttpException('No se encontraron registros del vendedor', 404);
    
                const repartidor = await this._userRepository.getById(create.repartidor, REPARTIDOR, txr)
    
                if(!repartidor) throw new HttpException('No se encontraron registros del repartidor', 404);
    
                const body = {
                    fecha_pedido: new Date(),
                    vendedor_solicitante: create.vendedor_solicitante,
                    repartidor: create.repartidor,
                    estado: 'POR ATENDER'
                }
    
                const pedido = await this._pedidosRepository.create(body, txr);
    
                console.log('el pedido', pedido)
    
                if(!pedido.numero_pedido) throw new HttpException('No se registro el pedido', 400);
    
                const createDetail = create.lista_productos;
    
                createDetail.map( producto => {
                    producto['numero_pedido'] = pedido.numero_pedido
                });

                const idDetalle = await this._pedidosRepository.createDetail(createDetail, txr);
    
                if(!idDetalle) throw new HttpException('No se registro el detalle del pedido', 400);
    
                return response.succest(200, 'Pedido registrado con exito', pedido.numero_pedido); 
            })
        } catch (error) {
            return response.error(error.status??400, error.message);
        }
    }

    async update(update: UpdateProcessStateDto): Promise<ResponseInterface>{
        const response = new ResponseHandler();
        try {
            const pedido = await this._pedidosRepository.getById(update.numero_pedido);
            if(!pedido) throw new HttpException('No se encontraron registros del pedido', 404);

            const secuencia_actual = lista_secuencia_estados.find(x => x.state == pedido.estado);

            const secuencia_entrante = lista_secuencia_estados.find(x => x.state == update.estado);

            const body = { numero_pedido: update.numero_pedido, estado: update.estado }

            if(secuencia_actual.id < secuencia_entrante.id && (secuencia_entrante.id - secuencia_actual.id) == 1){
                switch(secuencia_entrante.state){
                    case EN_PROCESO:
                        body['fecha_recepcion'] = new Date();
                        break;
                    case EN_DELIVERY:
                        body['fecha_despacho'] = new Date();
                        break;
                    case RECIBIDO:
                        body['fecha_entrega'] = new Date();
                        break;
                }
                const result = await this._pedidosRepository.update(update.numero_pedido, body)
                return response.succest(200,'Estado actualizado exitosamente', result);
            }
            else{
                throw new HttpException(`No puedes pasar del estado ${secuencia_actual.state} al estado ${secuencia_entrante.state} por jerarquia`, 400);
            }
        } catch (error) {
            console.log(error)
            return response.error(error.status??400, error.message);
        }

    }

    async getByIdDetail(numero_pedido: number){
        const response = new ResponseHandler();
        try {
            const detail = await this._pedidosRepository.getByIdDetail(numero_pedido);
            return response.succest(200,'consulta de detalle exitosa', detail);
        } catch (error) {
            console.log(error)
            return response.error(error.status??400, error.message);
        }
    }
}