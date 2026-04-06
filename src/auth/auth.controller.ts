import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/signin.dto";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async SignIn(@Body() signInDto: SignInDto): Promise<object> {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }
}