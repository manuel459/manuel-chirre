export interface IProductosRepository {
    getById(SKU:string);
    getAll(sku: string, nombre: string);
}