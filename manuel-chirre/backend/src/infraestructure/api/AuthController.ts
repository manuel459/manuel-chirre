import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AuthServices } from "src/application/services/AuthService";
import { Response } from 'express';
import { UserRepository } from "../repository/UsersRepository";
import { JwtService } from "@nestjs/jwt";
import { UserObjectLogin } from "src/application/dto/UserObjectLogin";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private authService: AuthServices;
    constructor(private userRepository: UserRepository,private jwtService: JwtService){
        this.authService = new AuthServices(jwtService,userRepository);
    }

    @Post('login')
    async login(@Body() payload: UserObjectLogin, @Res() res: Response){
        const response = await this.authService.login(payload)
        return res.status(response.status).json(response);
    }

}