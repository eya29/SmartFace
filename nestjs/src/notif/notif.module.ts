// src/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsController } from './notif.controller';
import { NotificationsService } from './notif.service';
import { NotificationSchema } from './notif.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Notification', schema: NotificationSchema }]),
    UserModule,
    ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
