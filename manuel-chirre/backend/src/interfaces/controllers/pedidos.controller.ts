import { Body, Controller, Get, Post, Put, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { PedidosServices } from "src/application/services/pedidos.service";
import { PostgresqlUserRepository } from "src/infraestructure/persistence/postgresql.users.repository";
import { PostgresqlProductosRepository } from "src/infraestructure/persistence/postgresql.productos.repository";
import { PostgresqlPedidosRepository } from "src/infraestructure/persistence/postgresql.pedidos.respository";
import { JwtAuthGuard } from "src/infraestructure/guards/jwt-auth-guard";
import { GetAllPedidosDto } from "../dto/get-all-pedidos.dto";
import { CreatePedidoDto, GetDetailPedidoDto } from "../dto/create-pedido.dto";
import { UpdateProcessStateDto } from "../dto/update-process-state.dto";

@ApiBearerAuth()
@ApiTags('pedidos')
@Controller('pedidos')
export class PedidosController {
    private readonly _pedidosService: PedidosServices
    constructor(private userRepository: PostgresqlUserRepository, private productosRepository: PostgresqlProductosRepository, private pedidosRespository: PostgresqlPedidosRepository){
        this._pedidosService = new PedidosServices(productosRepository,userRepository, pedidosRespository);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getOrders(@Query() payload: GetAllPedidosDto, @Res() res: Response){
        const response = await this._pedidosService.getAll(payload);
        return res.status(response.status).json(response);
    }

    @UseGuards(JwtAuthGuard)
    @Get('detail')
    async getByIdDetail(@Query() payload: GetDetailPedidoDto, @Res() res: Response){
        const response = await this._pedidosService.getByIdDetail(payload.numero_pedido);
        return res.status(response.status).json(response);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async create(@Body() createPedido: CreatePedidoDto, @Res() res: Response){
        console.log(createPedido);
        const response = await this._pedidosService.create(createPedido);
        return res.status(response.status).json(response);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-state-process')
    async update(@Body() updatePedido: UpdateProcessStateDto, @Res() res: Response){
        console.log(updatePedido);
        const response = await this._pedidosService.update(updatePedido);
        return res.status(response.status).json(response);
    }
}