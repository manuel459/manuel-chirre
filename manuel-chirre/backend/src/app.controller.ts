import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Knex } from 'knex';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly knex: Knex) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
