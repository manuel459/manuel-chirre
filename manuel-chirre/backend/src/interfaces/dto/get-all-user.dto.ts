import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetAllUserDto {
    @ApiProperty()
    @IsOptional()
    rol: string;
}