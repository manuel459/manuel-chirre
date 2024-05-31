import { IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";

export interface IResponse {
    status: number,
    succest: boolean,
    message: string | string[],
    data?: any
}

export class ResponseHandler {
    succest(status: number, message: string | string[], data : any): IResponse {
        return {
            status: status,
            message: message,
            succest : true,
            data: data
        };
    }

    error(status: number, message: string | string[]): IResponse{
        return {
            status: status,
            message: message,
            succest : false
        }
    }
}

export class requestGenericPaginate{
    @IsOptional()
    filterOne?: string;
    @IsOptional()
    filterTwo?: string;
    @IsOptional()
    filterThree?: string;
    @IsNotEmpty()
    fecha_inicio: string;
    @IsNotEmpty()
    fecha_fin: string;
    @IsNotEmpty()
    order: string;
    @IsOptional()
    short: string = 'asc';
    @IsOptional()
    page: number = 1;
    @IsOptional()
    perPage: number = 10;
}