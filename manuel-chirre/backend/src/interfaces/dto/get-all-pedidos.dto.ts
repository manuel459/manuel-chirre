import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetAllPedidosDto {
    @ApiProperty()
    @IsOptional()
    nro_pedido: number;

    @ApiProperty()
    @IsOptional()
    fecha_inicio: Date;

    @ApiProperty()
    @IsOptional()
    fecha_fin:Date;

    @ApiProperty()
    @IsOptional()
    tipo_fecha: string;
}