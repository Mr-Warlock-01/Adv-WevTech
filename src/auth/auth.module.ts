import { Module } from "@nestjs/common";
import { DBModule } from "../db/db.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./constants";
import { JwtModule } from "@nestjs/jwt";


@Module({
    imports: [
        DBModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule {} 