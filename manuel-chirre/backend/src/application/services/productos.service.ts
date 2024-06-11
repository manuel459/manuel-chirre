import { ProductosRepository } from "src/domain/repositories/productos.repository";
import { ResponseInterface } from "src/shared/interfaces/response.interface";
import { ResponseHandler } from "src/shared/responses/response";


export class ProductosServices {
    constructor(private _productosRepository: ProductosRepository){

    }

    async getAll(sku: string, nombre:string): Promise<ResponseInterface>{
        const response = new ResponseHandler();
        try {
            const result = await this._productosRepository.getAll(sku, nombre);
            return response.succest(200, 'Consulta exitosa', result);   
        } catch (error) {
            return response.error(error.status, error.message);
        }
    }
}