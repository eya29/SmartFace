import { Controller, Get, Post, Body, UseGuards, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateEmployeeDto, CreateUserDto, CreateVisitorDto } from './dto/create-user.dto';
import { User } from './schema/user.schema';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }


  // Employee Controller
  @Post('/employee')
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.userService.create(createEmployeeDto);
  }

  @Get('employee')
  async getEmployee(): Promise<User[]> {
    return this.userService.findEmployees();
  }

  @Delete('employee/:id')
  async deleteEmployee(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }

  @Put('employee/:id')
  async updateEmployees(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.userService.updateEmployees(id, updateUserDto);
  }



  @Get()
  async findAll() {
    return this.userService.findAll();
  }
  // @Get(':id')
  // async findById(@Param('id') id: string) {
  //   return this.userService.findById(id);
  // }



  // Visitor
  @Get('visitor')
  async getVisitor(): Promise<User[]> {
    return this.userService.findVisitors();
  }

  @Put('visitor/:id')
  async updateVisitors(@Body() updateUserDto: Partial<CreateUserDto>) {
    return this.userService.updateVisitors(updateUserDto);
  }

  @Post('/visitor')
  async createVisitor(@Body() createVisitorDto: CreateVisitorDto) {
    return this.userService.create(createVisitorDto);
  }

  @Delete('visitor/:id')
  async deleteVisitor(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }



  // Unknown
  @Get('unknown')
  async getUnknown(): Promise<User[]> {
    return this.userService.findUnknown();
  }

  @Put('unknown/:id')
  async updateUnknown(@Body() updateUserDto: Partial<CreateUserDto>) {
    return this.userService.updateUnknown(updateUserDto);
  }


  @Post('/unknown')
  async createUnknown(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete('unknown/:id')
  async deleteUnknown(@Param('id') id: string): Promise<void> {
    await this.userService.delete(id);
  }



  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: Partial<CreateUserDto>) {
    return this.userService.update(id, updateUserDto);
  }

  //admin 
  @Get('admin')
  async getAdmin(): Promise<User[]> {
    return this.userService.findAdmin();
  }

}
