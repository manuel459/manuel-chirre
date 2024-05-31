import { Body, Controller, Get, HttpStatus, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { UserRepository } from "../repository/UsersRepository";
import { JwtAuthGuard } from "../jwt.AuthGuard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreatePedidoObject } from "src/application/dto/CreatePedidoObject";
import { PedidosServices } from "src/application/services/PedidosService";
import { ProductosRepository } from "../repository/ProductosRepository";
import { PedidosRepository } from "../repository/PedidosRespository";
import { UpdateProcessStateObject } from "src/application/dto/UpdateProcessStateObject";
import { getAllPedidosObject } from "src/application/dto/getAllPedidosObject";

@ApiBearerAuth()
@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
    private readonly _pedidosService: PedidosServices
    constructor(private userRepository: UserRepository, private productosRepository: ProductosRepository, private pedidosRespository: PedidosRepository){
        this._pedidosService = new PedidosServices(productosRepository,userRepository, pedidosRespository);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getOrders(@Query() payload: getAllPedidosObject, @Res() res: Response){
        const response = await this._pedidosService.getAll(payload.nro_pedido);
        return res.status(response.status).json(response);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createPedido: CreatePedidoObject, @Res() res: Response){
        console.log(createPedido);
        const response = await this._pedidosService.create(createPedido);
        return res.status(response.status).json(response);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-state-process')
    async update(@Body() updatePedido: UpdateProcessStateObject, @Res() res: Response){
        console.log(updatePedido);
        const response = await this._pedidosService.update(updatePedido);
        return res.status(response.status).json(response);
    }
}