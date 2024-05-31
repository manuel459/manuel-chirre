import { IProductosRepository } from "src/infraestructure/interfaces/IProductosRepository";
import { ResponseHandler } from "../IResponse";

export class ProductosServices {
    constructor(private _productosRepository: IProductosRepository){

    }

    async getAll(sku: string, nombre:string){
        const response = new ResponseHandler();
        try {
            const result = await this._productosRepository.getAll(sku, nombre);
            return response.succest(200, 'Consulta exitosa', result);   
        } catch (error) {
            return response.error(error.status, error.message);
        }
    }
}