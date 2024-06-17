import { JwtService } from "@nestjs/jwt";
import { ResponseHandler } from "../../shared/responses/response";
import { HttpException } from "@nestjs/common";
import { compare } from 'bcrypt'
import { UserLoginDto } from "src/interfaces/dto/user-login.dto";
import { ResponseInterface } from "src/shared/interfaces/response.interface";
import { UserRepository } from "src/domain/repositories/user.repository";

export class AuthServices {

    constructor(private readonly jwtService: JwtService, private userRepository: UserRepository){

    }

    async login(usuario: UserLoginDto): Promise<ResponseInterface>{
        const response = new ResponseHandler();
        try {
            const context = await this.userRepository.dbContext();
            return context.transaction(async (txr)=> {
                console.log('llego al servicios')
                const user = await this.userRepository.getUser(usuario.correo, txr);
                console.log(user)
                if(!user){
                    throw new HttpException('USER_NOT_FOUND', 404);
                }

                const verificarPassword = await compare(usuario.password, user.password);
                if(!verificarPassword) throw new HttpException('PASSWORD_INCORRECT', 403);

                const token = await this.jwtService.signAsync({id: user.id, codigotrabajador: user.codigotrabajador, correo: user.correo, nombre: user.nombre });   
                console.log('resultando', token)
                return response.succest(200, 'Token obtenido satisfactoriamente', { nombre: user.nombre , accessToken: token } );
            })
            
        } catch (error) {
            console.log(error);
            return response.error(error.status, error.message);
        }
    }
}