import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class GetAllProductDto {
    @ApiProperty()
    @IsOptional()
    sku: string;

    @ApiProperty()
    @IsOptional()
    nombre: string;
}