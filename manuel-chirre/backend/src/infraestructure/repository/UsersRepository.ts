import { Knex } from "knex";
import { IUserRepository } from "../interfaces/IUserRepository";
import { requestGenericPaginate } from "src/application/IResponse";
import { InjectKnex } from "nestjs-knex";

export class UserRepository implements IUserRepository {

    constructor(@InjectKnex() private readonly knex: Knex){}
    
    async getAll(rol:string){
        const query = this.knex('usuarios').select();
        if(rol && rol != 'null'){
            query.where('rol', rol)
        }
        return await query;
    }

    async getUser(correo: string) {
        return await this.knex('usuarios').where('correo', correo).first()
    }

    async insert(insert: any){
        return await this.knex('usuarios').insert(insert);
    }

    async getById(id: number, rol: string){
        return await this.knex('usuarios').where('id', id).where('rol', rol).first();
    }
    
}