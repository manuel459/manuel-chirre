import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { AplicationModule } from './infraestructure/aplication.module';
import { attachPaginate } from 'knex-paginate';
import { DATA_CONNECTION } from './infraestructure/config/database-config';

attachPaginate();
@Module({
  imports: [
    KnexModule.forRootAsync({
      useFactory: () => (DATA_CONNECTION),
    }), AplicationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
