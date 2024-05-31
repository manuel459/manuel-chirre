import { UserRepository } from "src/infraestructure/repository/UsersRepository";
import { JwtService } from '@nestjs/jwt';
import { CreateUserObject } from "../dto/CreateUserObject";
import { ResponseHandler } from "../IResponse";
import { hash } from 'bcrypt'
import { HttpException } from "@nestjs/common";
import { CreatePedidoObject } from "../dto/CreatePedidoObject";
import { ProductosRepository } from "src/infraestructure/repository/ProductosRepository";
import { EN_DELIVERY, EN_PROCESO, RECIBIDO, REPARTIDOR, VENDEDOR, lista_secuencia_estados } from "src/infraestructure/const/constantes";
import { IProductosRepository } from "src/infraestructure/interfaces/IProductosRepository";
import { IUserRepository } from "src/infraestructure/interfaces/IUserRepository";
import { IPedidosRepository } from "src/infraestructure/interfaces/IPedidosRepository";
import { UpdateProcessStateObject } from "../dto/UpdateProcessStateObject";

export class PedidosServices {
    constructor(private readonly _productRepository: IProductosRepository, private _userRepository: IUserRepository, private _pedidosRepository :IPedidosRepository){

    }

    async getAll(nro_pedido: number){
        const response = new ResponseHandler();
        try {
            const result = await this._pedidosRepository.getAll(nro_pedido);
            return response.succest(200, 'consulta exitosa', result);
        }catch(error){
            return response.error(error.state, error.message);
        }
    }

    async create(create: CreatePedidoObject){
        const response = new ResponseHandler();
        try {
            for(let item of create.lista_productos){
                const product = await this._productRepository.getById(item)
                if(!product) throw new HttpException('No se encontraron registros del producto', 400)
            }
            
            const vendedor = await this._userRepository.getById(create.vendedor_solicitante, VENDEDOR)
            console.log('datos', vendedor)
            if(!vendedor) throw new HttpException('No se encontraron registros del vendedor', 404);

            const repartidor = await this._userRepository.getById(create.repartidor, REPARTIDOR)

            if(!repartidor) throw new HttpException('No se encontraron registros del repartidor', 404);

            const body = {
                lista_productos: create.lista_productos,
                fecha_pedido: new Date(),
                vendedor_solicitante: create.vendedor_solicitante,
                repartidor: create.repartidor,
                estado: 'POR ATENDER'
            }

            const insert = await this._pedidosRepository.create(body);

            return response.succest(200, 'Pedido registrado con exito', insert);   
        } catch (error) {
            return response.error(error.state, error.message);
        }
    }

    async update(update: UpdateProcessStateObject){
        const response = new ResponseHandler();
        try {
            const pedido = await this._pedidosRepository.getById(update.numero_pedido);
            if(!pedido) throw new HttpException('No se encontraron registros del pedido', 400);

            const secuencia_actual = lista_secuencia_estados.find(x => x.state == pedido.estado);

            const secuencia_entrante = lista_secuencia_estados.find(x => x.state == update.estado);

            const body = { numero_pedido: update.numero_pedido }

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
}