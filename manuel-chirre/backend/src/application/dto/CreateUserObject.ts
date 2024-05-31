import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { DELIVERY, ENCARGADO, REPARTIDOR, VENDEDOR } from "src/infraestructure/const/constantes";

export class CreateUserObject {
    @ApiProperty()
    @IsNotEmpty()
    codigotrabajador: string;

    @ApiProperty()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty()
    @IsNotEmpty()
    correo: string;

    @ApiProperty()
    @IsOptional()
    telefono: string;

    @ApiProperty()
    @IsNotEmpty()
    puesto: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsIn([ENCARGADO, VENDEDOR, DELIVERY, REPARTIDOR])
    rol: string;
    
    @ApiProperty()
    @IsNotEmpty()
    password: string;
}