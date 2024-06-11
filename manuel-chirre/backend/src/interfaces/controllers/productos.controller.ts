import { Controller, Get, Query, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { ProductosServices } from "src/application/services/productos.service";
import { JwtAuthGuard } from "src/infraestructure/guards/jwt-auth-guard";
import { PostgresqlProductosRepository } from "src/infraestructure/persistence/postgresql.productos.repository";
import { GetAllProductDto } from "../dto/get-all-product.dto";

@ApiBearerAuth()
@ApiTags('productos')
@Controller('productos')
export class ProductosController {
    private readonly _productService: ProductosServices;
    constructor(private productosRepository: PostgresqlProductosRepository){
        this._productService = new ProductosServices(productosRepository);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getAll(@Query() payload: GetAllProductDto, @Res() res:Response){
        const response = await this._productService.getAll(payload.sku, payload.nombre);
        return res.status(response.status).json(response);
    }
}