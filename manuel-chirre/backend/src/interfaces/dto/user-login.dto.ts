import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserLoginDto {
    @ApiProperty()
    @IsNotEmpty()
    correo: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}