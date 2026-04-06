import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantModule } from './restaurant/restaurant.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [RestaurantModule, AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'DB',
      autoLoadEntities: true,
      synchronize: true ,
    }),
    MailerModule.forRoot({
      transport: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'shaminyasser001@gmail.com',
        pass: 'XXXXXXXXXXXXXXXXXX',
      },
      },
    }),
  
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
