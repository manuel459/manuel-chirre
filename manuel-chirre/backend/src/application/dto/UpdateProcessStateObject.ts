import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";
import { EN_DELIVERY, EN_PROCESO, RECIBIDO } from "src/infraestructure/const/constantes";

export class UpdateProcessStateObject {
    @ApiProperty()
    @IsNotEmpty()
    numero_pedido: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn([EN_PROCESO, EN_DELIVERY, RECIBIDO])
    estado: string;
}