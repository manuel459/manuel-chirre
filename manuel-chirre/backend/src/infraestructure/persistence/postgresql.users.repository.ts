import { Knex } from "knex";
import { InjectKnex } from "nestjs-knex";
import { UserRepository } from "src/domain/repositories/user.repository";

export class PostgresqlUserRepository implements UserRepository {

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