import { Body, Controller, Get, HttpStatus, Post, Query, Res, UseGuards } from "@nestjs/common";
import { Knex } from "knex";
import { Response } from 'express';
import { InjectKnex } from "nestjs-knex";
import {  ResponseHandler, requestGenericPaginate } from "src/application/IResponse";
import { UserServices } from "src/application/services/userService";
import { CreateUserObject } from "src/application/dto/CreateUserObject";
import { UserRepository } from "../repository/UsersRepository";
import { JwtAuthGuard } from "../jwt.AuthGuard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { getAllUserObject } from "src/application/dto/getAllUserObject";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
    private readonly _userService: UserServices
    constructor(private userRepository: UserRepository){
        this._userService = new UserServices(userRepository);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    async getUsers(@Query() payload: getAllUserObject, @Res() res: Response){
        const response = await this._userService.getAll(payload.rol);
        return res.status(response.status).json(response);
    }

    @Post('create')
    async insert(@Body() createUser: CreateUserObject, @Res() res: Response){
        console.log(createUser);
        const response = await this._userService.insert(createUser)
        return res.status(response.status).json(response);
    }

}