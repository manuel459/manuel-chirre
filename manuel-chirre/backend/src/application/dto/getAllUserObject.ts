import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class getAllUserObject {
    @ApiProperty()
    @IsOptional()
    rol: string;
}