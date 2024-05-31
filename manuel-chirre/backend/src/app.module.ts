import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nestjs-knex';
import { UsersController } from './infraestructure/api/UsersController';
import { UsersModule } from './infraestructure/users.module';
import { attachPaginate } from 'knex-paginate';
import { JwtModule } from '@nestjs/jwt';

attachPaginate();
@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => ({
        config: {
          client: 'pg',
          connection: {
            host: 'localhost',
            user: 'postgres',
            port: 5432,
            password: 'root',
            database: 'postgres' 
          }
        },
      }),
    }), UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
