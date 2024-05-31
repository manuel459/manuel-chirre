import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePedidoObject {

    @ApiProperty()
    @IsNotEmpty()
    lista_productos: [];

    @ApiProperty()
    @IsNotEmpty()
    vendedor_solicitante: number;

    @ApiProperty()
    @IsNotEmpty()
    repartidor: number;
}