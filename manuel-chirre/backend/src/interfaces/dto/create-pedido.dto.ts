import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsNotEmpty } from "class-validator";

export class Lista_Productos {
    @ApiProperty()
    @IsNotEmpty()
    sku: string;

    @ApiProperty()
    @IsNotEmpty()
    cantidad: number 
}

export class CreatePedidoDto {

    @ApiProperty({ type: [Lista_Productos] })
    @ArrayNotEmpty()
    lista_productos: Lista_Productos[]

    @ApiProperty()
    @IsNotEmpty()
    vendedor_solicitante: number;

    @ApiProperty()
    @IsNotEmpty()
    repartidor: number;
}

export class GetDetailPedidoDto {
    @ApiProperty()
    @IsNotEmpty()
    numero_pedido: number
}


