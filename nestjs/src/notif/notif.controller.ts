import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotificationsService } from './notif.service';

@Controller('/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) { }

  // @Post()
  // async createNotification(
  //   @Body('employeeId') userId: string,
  //   @Body('message') message: string,
  //   @Body('description') description?: string,
  //   @Body('isRead') isRead?: boolean 
  // ) {
  //   return this.notificationsService.createNotification(userId , message, description);
  // }

  @Get()
  async getNotifications() {
    return this.notificationsService.getNotifications();
  }

  @Patch(':id/read')
  async markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(':id')
  async deleteNotif(@Param('id') id: string): Promise<void> {
    await this.notificationsService.deleteNotification(id);
  }


}
