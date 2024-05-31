import { Injectable } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWSToken } from "./const/JWSToken";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWSToken.secret
        })
    }

    async validate(payload: any){
        return { userId: payload.sub, username: payload.username }
    }
}