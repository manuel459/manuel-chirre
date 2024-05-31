import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserObjectLogin {
    @ApiProperty()
    @IsNotEmpty()
    correo: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}