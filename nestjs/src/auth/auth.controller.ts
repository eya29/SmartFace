import { Controller, Post , Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../user/dto/register.dto';
import { LoginDto } from '../user/dto/login-user.dto';
import { RefreshTokenDto } from '../user/dto/refreshToken..dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  async register(@Body() registerData: RegisterDto){
    return this.authService.register(registerData);
  }


  @Post('login')
  async login(@Body() loginData: LoginDto){
    return this.authService.login(loginData);
    
  }

  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto){
    return this.authService.refreshTokens(refreshTokenDto.refreshToken);
  }
  @Get('login')
    async getAllAdmins() {
        return this.authService.getAllAdmins();
    }
}
