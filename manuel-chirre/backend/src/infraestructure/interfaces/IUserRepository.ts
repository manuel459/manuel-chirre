import { requestGenericPaginate } from "src/application/IResponse";
import { UserObjectLogin } from "src/application/dto/UserObjectLogin";

export interface IUserRepository{
    getUser(correo:string);
    insert(insert: any);
    getById(id: number, rol: string);
    getAll(rol:string);
}