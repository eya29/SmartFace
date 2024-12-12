import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { AuthGuard } from './auth/guards/auth.guard';
import { User, UserSchema } from './user/schema/user.schema';
import { RefreshToken, RefreshTokenSchema } from './user/schema/refresh-token.schema';
import { AuthService } from './auth/auth.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { NotificationsModule } from './notif/notif.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    JwtModule.register({
      secret: '123', 
      signOptions: { expiresIn: '2h' },
    }),
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRoot('mongodb+srv://eyayounes:1234@cluster0.sjjluct.mongodb.net/reconnaissance'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
   // MongooseModule.forRoot('mongodb+srv://eyayounes:1234@cluster0.sjjluct.mongodb.net/reconnaissance'),  
    NotificationsModule, 
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
  ],
  controllers: [UserController,AppController], 
  providers: [UserService,AuthGuard, AuthService, AppService],
})
export class AppModule {}
