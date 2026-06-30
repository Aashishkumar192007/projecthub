import { Controller, Get, Patch, Post, Param, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotifications(@CurrentUser() user: any) {
    // CurrentUser payload contains sub (user id) and tenantId
    return this.notificationService.getNotifications(user.sub || user.id, user.tenantId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @CurrentUser() user: any) {
    return this.notificationService.markAsRead(id, user.sub || user.id);
  }

  @Post('read-all')
  markAllAsRead(@CurrentUser() user: any) {
    return this.notificationService.markAllAsRead(user.sub || user.id, user.tenantId);
  }

  @Post()
  createNotification(
    @CurrentUser() user: any,
    @Body('title') title: string,
    @Body('message') message: string,
    @Body('type') type?: string,
  ) {
    return this.notificationService.createNotification(
      user.sub || user.id,
      user.tenantId,
      title,
      message,
      type || 'INFO',
    );
  }
}
