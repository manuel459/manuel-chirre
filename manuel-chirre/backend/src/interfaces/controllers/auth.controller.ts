import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { JwtService } from "@nestjs/jwt";
import { ApiTags } from "@nestjs/swagger";
import { PostgresqlUserRepository } from "src/infraestructure/persistence/postgresql.users.repository";
import { AuthServices } from "src/application/services/auth.service";
import { UserLoginDto } from "../dto/user-login.dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private authService: AuthServices;
    constructor(private userRepository: PostgresqlUserRepository,private jwtService: JwtService){
        this.authService = new AuthServices(jwtService,userRepository);
    }

    @Post('login')
    async login(@Body() payload: UserLoginDto, @Res() res: Response){
        const response = await this.authService.login(payload)
        return res.status(response.status).json(response);
    }

}