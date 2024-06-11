import { Body, Controller, Get, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
import { UserServices } from "src/application/services/user.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/infraestructure/guards/jwt-auth-guard";
import { GetAllUserDto } from "../dto/get-all-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";
import { PostgresqlUserRepository } from "src/infraestructure/persistence/postgresql.users.repository";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    private readonly _userService: UserServices
    constructor(private userRepository: PostgresqlUserRepository){
        this._userService = new UserServices(userRepository);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getUsers(@Query() payload: GetAllUserDto, @Res() res: Response){
        const response = await this._userService.getAll(payload.rol);
        return res.status(response.status).json(response);
    }

    @Post('create')
    async insert(@Body() createUser: CreateUserDto, @Res() res: Response){
        console.log(createUser);
        const response = await this._userService.insert(createUser)
        return res.status(response.status).json(response);
    }

}