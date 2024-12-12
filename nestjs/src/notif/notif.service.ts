// src/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notif.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/user/schema/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification') private readonly notificationModel: Model<Notification>,
    private readonly userService: UserService,
  ) { }

  async getNotifications(): Promise<Notification[]> {
    return this.notificationModel.find().exec();
  }

  async markAsRead(id: string): Promise<Notification> {
    return this.notificationModel.findByIdAndUpdate(id, { isRead: true }, { new: true }).exec();
  }

  async toggleReadStatus(id: string): Promise<Notification> {
    const notification = await this.notificationModel.findById(id);
    if (!notification) {
      throw new Error('Notification not found');
    }
    notification.isRead = !notification.isRead;
    return notification.save();
  }

  async deleteNotification(id: string): Promise<Notification | null> {
    return this.notificationModel.findByIdAndDelete(id).exec();
  }

  private async sendNotification(userId: string, message: string, description: string) {
    const newNotification = new this.notificationModel({ userId, message, description });
    return newNotification.save();
  }

  // Vérifier les employés en retard toutes les 10 minutes
  @Cron(CronExpression.EVERY_10_MINUTES)
  async checkForLateEmployees() {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0, 0); // 9h du matin

    const employeesInCheckList = await this.userService.findEmployees(); // Implémentez cette fonction pour récupérer les employés dans la check list

    for (const employee of employeesInCheckList) {
      if (employee.arrivalTime && employee.arrivalTime > startOfDay) {
        await this.sendNotification(
          'admin',
          `Employee ${employee.fullName} is late`,
          `Employee ${employee.fullName} arrived at ${employee.arrivalTime}.`
        );
      }
    }
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  async handleCron() {
    await this.checkForLateEmployees();
  }
}
