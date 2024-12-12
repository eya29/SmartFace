import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { RegisterDto } from '../user/dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../user/dto/login-user.dto';
import { privateDecrypt } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from '../user/schema/refresh-token.schema';
import { v4 as uuidv4} from 'uuid'
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>,
        private jwtService : JwtService
    ) {
    }

    async register(registerData: RegisterDto) {
        const { email, password, name } = registerData;

        const emailInUse = await this.UserModel.findOne({ email });
        if (emailInUse) {
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

           await this.UserModel.create({
            name, 
            email,
            password: hashedPassword,
        });
    }

    async login(credentials: LoginDto) {
        const { email, password } = credentials;

        const user = await this.UserModel.findOne({ email });
        if (!user) {
            throw new BadRequestException('wrong credentials');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            throw new BadRequestException('wrong credentials');
        }
        
        const tokens = await this.generateTokens(user._id);
        return{
            ...tokens,
            userId : user._id, 
            role:"admin"
        }
    }

    async refreshTokens(refreshToken: string){
        const token = await this.RefreshTokenModel.findOneAndDelete({
            token: refreshToken,
            expiryDate: {$gte: new Date()},
        });

        if (!token){
            throw new UnauthorizedException("Refresh Token is invalid")
        }
        return this.generateTokens(token.userId);
    }

    async generateTokens(userId){
        try {
            const accessToken = this.jwtService.sign({ userId }, { expiresIn: '2h' });
            const refreshToken = uuidv4();
            await this.storeRefreshToken(refreshToken, userId);
            return { accessToken, refreshToken };
        } catch (error) {
            console.error('Error generating tokens:', error.message);
            throw new InternalServerErrorException('Could not generate tokens');
        };
    }

    async storeRefreshToken(token: string, userId) {
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() +3 );

        await this.RefreshTokenModel.create({ token, userId, expiryDate});
    }
    async getAllAdmins() {
        try {
            const admins = await this.UserModel.find({ role: 'admin' }).exec();
            return admins;
        } catch (error) {
            console.error('Error fetching admins:', error.message);
            throw new InternalServerErrorException('Could not fetch admins');
        }
    }
    
}
