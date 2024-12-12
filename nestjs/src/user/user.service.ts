import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {

      if (createUserDto.role === 'employee') {
        if (!createUserDto.department || !createUserDto.post) {
          throw new BadRequestException('Department and post are required for employee.');
        }
      } else if (createUserDto.role === 'visitor') {
        if (!createUserDto.but) {
          throw new BadRequestException('But is required for visitor.');
        }
      } else if (createUserDto.role === 'admin') {
        if (!createUserDto.password) {
          throw new BadRequestException('password is required for visitor.');
        }
      } else if (createUserDto.role === 'unknown') {
        createUserDto
      }

      const newUser = new this.userModel(createUserDto);
      return await newUser.save();
    } catch (error) {

      console.error('Error creating user:', error);
      throw new BadRequestException(`Error creating user: ${error.message}`);
    }
  }


  async getUsersByRole(role: string): Promise<User[]> {
    return this.userModel.find({ role }).exec();
  }


  // async findById(id: string): Promise<User> {
  //   const user = await this.userModel.findById(id).exec();
  //   if (!user) {
  //     throw new NotFoundException(`User with id ${id} not found`);
  //   }
  //   return user;
  // }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  // Employee
  async findEmployees(): Promise<User[]> {
    return this.userModel.find({ role: 'employee' }).exec();
  }

  async updateEmployees(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User[]> {
    const users = await this.userModel.findByIdAndUpdate({ role: 'employee' }, updateUserDto, {
      new: true,
      runValidators: true,
    }).exec();

    return this.findEmployees(); // Return updated list
  }


  // Visitor
  async findVisitors(): Promise<User[]> {
    return this.userModel.find({ role: 'visitor' }).exec();
  }

  async updateVisitors(updateUserDto: Partial<CreateUserDto>): Promise<User[]> {
    const users = await this.userModel.findByIdAndUpdate({ role: 'visitor' }, updateUserDto, {
      new: true,
      runValidators: true,
    }).exec();

    return this.findVisitors(); // Return updated list
  }


  // UNKNOWN
  async findUnknown(): Promise<User[]> {
    return this.userModel.find({ role: 'unknown' }).exec();
  }

  async updateUnknown(updateUserDto: Partial<CreateUserDto>): Promise<User[]> {
    const users = await this.userModel.findByIdAndUpdate({ role: 'unknown' }, updateUserDto, {
      new: true,
      runValidators: true,
    }).exec();

    return this.findUnknown();
  }

  // Method to update a user by ID (already defined)
  async update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    }).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  // Method to delete a user (already defined)
  async delete(id: string): Promise<void> {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }



  // Admins
  async findAdmin(): Promise<User[]> {
    return this.userModel.find({ role: 'admin' }).exec();
  }
}
