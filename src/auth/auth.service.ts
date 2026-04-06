import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../entities/user.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import * as bycrypt from 'bcrypt';
import { MailerService } from "@nestjs-modules/mailer";



@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService,
        private mailerService: MailerService  
    ){}


    // async signIn(email: string, password: string): Promise<object> {
    //     const user = await this.userRepository.findOne({ 
    //         where: { email: email } 
    //     });
    //     if (!user) {
    //         throw new NotFoundException('User not found');
    //     }
    //     const isPasswordValid = await bycrypt.compare(password, user.password);
    //     if (!isPasswordValid) {
    //         throw new UnauthorizedException('Password is incorrect');
    //     }

    //     const payload = { 
    //         userId: user.userId,
    //         email: user.email,
    //         role: user.role
    //     };
        
    //     const {password: _, ...result} = user;
    //     return {
    //         success: true,
    //         message: 'Login successful',
    //         data: result,
    //         accessToken: this.jwtService.sign(payload)
    //     };
    // }

    


    async signIn(email: string, password: string): Promise<object> {
        const user = await this.userRepository.findOne({ 
            where: { email: email } 
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Password is incorrect');
        }
        try{   
            await this.mailerService.sendMail({ 
                to: user.email, 
                subject: "Login ALERT", 
                text: `Someone has logged in to your LOCAL FOOD HOUSE account at: ${new Date().toISOString()}.
                If this was not you, please change your password immediately and contact our support team.`,
            });
        }catch(error){
            console.error('Error sending email:', error);
        }

        const payload = { 
            userId: user.userId,
            email: user.email,
            role: user.role
        };
        
        const {password: _, ...result} = user;
        return {
            success: true,
            message: 'Login successful',
            data: result,
            accessToken: this.jwtService.sign(payload)
        };
    }
}