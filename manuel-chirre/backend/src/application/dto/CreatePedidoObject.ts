import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsNotEmpty, IsNumber, ValidateNested, isNumber } from "class-validator";

export class Lista_Productos {
    @ApiProperty()
    @IsNotEmpty()
    sku: string;

    @ApiProperty()
    @IsNotEmpty()
    cantidad: number 
}

export class CreatePedidoObject {

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

export class getDetailPedido {
    @ApiProperty()
    @IsNotEmpty()
    numero_pedido: number
}


