import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class getAllPedidosObject {
    @ApiProperty()
    @IsOptional()
    nro_pedido: number;
}