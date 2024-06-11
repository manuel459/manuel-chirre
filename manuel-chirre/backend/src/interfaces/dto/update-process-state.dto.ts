import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";
import { EN_DELIVERY, EN_PROCESO, RECIBIDO } from "src/shared/constants/constantes";

export class UpdateProcessStateDto {
    @ApiProperty()
    @IsNotEmpty()
    numero_pedido: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn([EN_PROCESO, EN_DELIVERY, RECIBIDO])
    estado: string;
}