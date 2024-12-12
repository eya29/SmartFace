import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {


  @Prop()
  picture: string;

  @Prop()
  fullName: string;


  @Prop({ enum: ['admin', 'employee', 'visitor', 'unknown'], required: true })
  role: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  email: string;



  @Prop()
  arrivalTime: Date;


  @Prop()
  department?: string;

  @Prop()
  post?: string;

  isEmployee(): boolean {
    return this.role === 'employee';
  }



  @Prop()
  but?: string;

  isVisitor(): boolean {
    return this.role === 'visitor';
  }


  @Prop()
  password?: string;
  isAdmin(): boolean {
    return this.role === 'admin';
  }
}


export const UserSchema = SchemaFactory.createForClass(User);
