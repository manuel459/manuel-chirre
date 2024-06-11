import { hash } from 'bcrypt'
import { HttpException } from "@nestjs/common";
import { UserRepository } from 'src/domain/repositories/user.repository';
import { ResponseInterface } from 'src/shared/interfaces/response.interface';
import { CreateUserDto } from 'src/interfaces/dto/create-user.dto';
import { ResponseHandler } from 'src/shared/responses/response';

export class UserServices {
    constructor(private readonly _userRepository: UserRepository){

    }

    async insert(create: CreateUserDto): Promise<ResponseInterface>{
        const response = new ResponseHandler();
        try {
            const usuario = await this._userRepository.getUser(create.correo);
            if(usuario) throw new HttpException('Usuario con correo ya existente', 404);

            create.password = await hash(create.password, 10);
            console.log('llego', create)
            const insert = await this._userRepository.insert(create);
            if(!insert) throw new HttpException('No se registro usuario', 400);
            return response.succest(200, 'Usuario Creado', insert);   
        } catch (error) {
            return response.error(error.status, error.message);
        }
    }

    async getAll(rol: string): Promise<ResponseInterface>{
        const response = new ResponseHandler();
        try {
            const result = await this._userRepository.getAll(rol);
            return response.succest(200, 'Consulta exitosa', result);   
        } catch (error) {
            return response.error(error.status, error.message);
        }
    }
}