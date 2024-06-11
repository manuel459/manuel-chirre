import { Module } from "@nestjs/common";
import { UserServices } from "src/application/services/user.service";
import { JwtModule } from "@nestjs/jwt";
import { JWSToken } from "../shared/constants/jwt.token";
import { PedidosServices } from "src/application/services/pedidos.service";
import { UsersController } from "src/interfaces/controllers/users.controller";
import { AuthController } from "src/interfaces/controllers/auth.controller";
import { PedidosController } from "src/interfaces/controllers/pedidos.controller";
import { ProductosController } from "src/interfaces/controllers/productos.controller";
import { AuthServices } from "src/application/services/auth.service";
import { ProductosServices } from "src/application/services/productos.service";
import { JWTStrategy } from "./strategies/jwt.strategy";
import { PostgresqlUserRepository } from "./persistence/postgresql.users.repository";
import { PostgresqlProductosRepository } from "./persistence/postgresql.productos.repository";
import { PostgresqlPedidosRepository } from "./persistence/postgresql.pedidos.respository";

@Module({
    imports: [
        JwtModule.register({
        global: true,
        secret: JWSToken.secret,
        secretOrPrivateKey: JWSToken.secret,
        signOptions: { expiresIn: '4h' },
      })
    ],
    controllers: [
        UsersController,
        AuthController,
        PedidosController,
        ProductosController
    ],
    providers: [
        AuthServices,
        UserServices,
        PostgresqlUserRepository,
        ProductosServices,
        PostgresqlProductosRepository,
        PedidosServices,
        PostgresqlPedidosRepository,
        JWTStrategy
    ]
  })
  
  export class AplicationModule {}