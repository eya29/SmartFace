import { from } from "rxjs";
import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';


export class RegisterDto {
    @IsString()
    name: string;

    @IsEmail()
    email:string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, {message: 'Password must contain at least one number'})
    password: string;

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/)
    confirmPassword: string;


  @IsNotEmpty()
  @IsString()
  role: string; 
}