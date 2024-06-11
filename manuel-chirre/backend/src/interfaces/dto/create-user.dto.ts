import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { DELIVERY, ENCARGADO, REPARTIDOR, VENDEDOR } from "src/shared/constants/constantes";

export class CreateUserDto {
    
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