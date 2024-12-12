// src/notifications/notification.schema.ts
import { Schema, Document } from 'mongoose';

export const NotificationSchema = new Schema({
  
  employeeId: { type: String, required: true },
  message: { type: String, required: true },
  description: { type: String, required: false },
  isRead: { type: Boolean, default: false }, // True/False field
  createdAt: { type: Date, default: Date.now },
});

export interface Notification extends Document {
  id?: String;
  employeeId: string;
  message: string;
  description?: string;
  isRead: boolean;
  createdAt: Date;
}
