import { ResponseInterface } from "../interfaces/response.interface";

export class ResponseHandler {
    succest(status: number = 200, message: string | string[], data : any): ResponseInterface {
        return {
            status: status,
            message: message,
            succest : true,
            data: data
        };
    }

    error(status: number = 400, message: string | string[]): ResponseInterface{
        return {
            status: status,
            message: message,
            succest : false
        }
    }
}