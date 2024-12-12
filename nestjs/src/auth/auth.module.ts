import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenSchema } from '../user/schema/refresh-token.schema';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { User, UserSchema } from 'src/user/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: RefreshToken.name, schema: RefreshTokenSchema },
    ]),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory:async (configService: ConfigService) => ({
    //     secret: configService.get<string>('JWT_SECRET'),
    //     signOptions: { expiresIn: '2h' },
    //   }),
    //   // global: true, 
    //   inject:[ConfigService],
    // }),
    // // ConfigModule.forRoot(),
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthGuard, AuthService],
})
export class AuthModule { }
