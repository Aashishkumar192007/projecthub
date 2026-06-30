import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) { }

  async getNotifications(user_id: string, tenant_id: string) {
    return this.prisma.notification.findMany({
      where: {
        user_id,
        tenant_id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async markAsRead(notificationId: string, user_id: string) {
    const notification = await this.prisma.notification.findFirst({
      where: {
        id: notificationId,
        user_id,
      },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    return this.prisma.notification.update({
      where: { id: notificationId },
      data: { is_read: true },
    });
  }

  async createNotification(user_id: string, tenant_id: string, title: string, message: string, type?: string) {
    return this.prisma.notification.create({
      data: {
        user_id,
        tenant_id,
        title,
        message,
      },
    });
  }

  async markAllAsRead(user_id: string, tenant_id: string) {
    return this.prisma.notification.updateMany({
      where: {
        user_id,
        tenant_id,
        is_read: false,
      },
      data: {
        is_read: true,
      },
    });
  }
}
