import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {



  @IsString()
  readonly picture: string;

  @IsString()
  readonly fullName: string;

  @IsString()
  readonly phoneNumber?: string;

  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly password: string;


  @IsEnum(['admin', 'employee', 'visitor', 'unknown'])
  readonly role: string;

  @IsOptional()
  @IsString()
  readonly department?: string;

  @IsOptional()
  @IsString()
  readonly post?: string;

  @IsOptional()
  @IsString()
  readonly but?: string;


  readonly arrivalTime: Date;
}

export class CreateEmployeeDto extends CreateUserDto {
  @IsString()
  readonly department: string;

  @IsString()
  readonly post: string;

  readonly role: 'employee';
}

export class CreateVisitorDto extends CreateUserDto {
  @IsString()
  readonly but: string;

  readonly role: 'visitor';
}

export class CreateAdminDto extends CreateUserDto {
  @IsString()
  readonly password: string;

  readonly role: 'admin';
}
