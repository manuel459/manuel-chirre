export interface ProductosRepository {
    getById(SKU:string);
    getAll(sku: string, nombre: string);
}