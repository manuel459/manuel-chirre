import { JwtService } from "@nestjs/jwt";
import { IUserRepository } from "src/infraestructure/interfaces/IUserRepository";
import { IResponse, ResponseHandler } from "../IResponse";
import { HttpException, UnauthorizedException } from "@nestjs/common";
import { UserObjectLogin } from "../dto/UserObjectLogin";
import { compare } from 'bcrypt'

export class AuthServices {

    constructor(private readonly jwtService: JwtService, private userRepository: IUserRepository){

    }

    async login(usuario: UserObjectLogin): Promise<IResponse>{
        const response = new ResponseHandler();
        try {
            console.log('llego al servicios')
            const user = await this.userRepository.getUser(usuario.correo);
            console.log(user)
            if(!user){
                throw new HttpException('USER_NOT_FOUND', 404);
            }

            const verificarPassword = await compare(usuario.password, user.password);
            if(!verificarPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

            const token = await this.jwtService.signAsync({id: user.id, codigotrabajador: user.codigotrabajador, correo: user.correo, nombre: user.nombre });   
            console.log('resultando', token)
            return response.succest(200, 'Token obtenido satisfactoriamente', { nombre: user.nombre , accessToken: token } );
        } catch (error) {
            console.log(error);
            return response.error(error.status, error.message);
        }
    }
}