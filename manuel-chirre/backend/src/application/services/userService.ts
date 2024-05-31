import { UserRepository } from "src/infraestructure/repository/UsersRepository";
import { JwtService } from '@nestjs/jwt';
import { CreateUserObject } from "../dto/CreateUserObject";
import { IResponse, ResponseHandler } from "../IResponse";
import { hash } from 'bcrypt'
import { HttpException } from "@nestjs/common";

export class UserServices {
    constructor(private readonly _userRepository: UserRepository){

    }

    async insert(create: CreateUserObject): Promise<IResponse>{
        const response = new ResponseHandler();
        try {
            create.password = await hash(create.password, 10);
            console.log('llego', create)
            const insert = await this._userRepository.insert(create);
            if(!insert) throw new HttpException('No se registro usuario', 404);
            return response.succest(200, 'Usuario Creado', insert);   
        } catch (error) {
            return response.error(error.status, error.message);
        }
    }

    async getAll(rol: string): Promise<IResponse>{
        const response = new ResponseHandler();
        try {
            const result = await this._userRepository.getAll(rol);
            return response.succest(200, 'Consulta exitosa', result);   
        } catch (error) {
            return response.error(error.status, error.message);
        }
    }
}