import { Controller, Get, Post, Body, Query, Req } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('api/v1/whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsappService: WhatsAppService) {}

  private extractContext(req: any) {
    return {
      tenantId: req.headers['x-tenant-id'] || req.user?.tenantId || 't-inst-101',
      userId: req.headers['x-user-id'] || req.user?.id || 'exec-aashish-1'
    };
  }

  @Get('session')
  getSession(@Req() req: any) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.getSession(tenantId, userId);
  }

  @Post('session/connect')
  connectSession(@Req() req: any, @Body() body: { phone: string }) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.connectSession(tenantId, userId, body.phone || '9876543210');
  }

  @Post('session/disconnect')
  disconnectSession(@Req() req: any) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.disconnectSession(tenantId, userId);
  }

  @Post('session/scan')
  triggerQrScan(@Req() req: any) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.triggerQrScan(tenantId, userId);
  }

  @Get('chats')
  getChats(@Req() req: any, @Query('category') category: string) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.getChats(tenantId, userId, category);
  }

  @Post('messages')
  sendMessage(@Req() req: any, @Body() body: { chatId: string; content: string; mediaType?: string; mediaUrl?: string }) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.sendMessage(tenantId, userId, body.chatId, body.content, body.mediaType, body.mediaUrl);
  }

  @Post('analyze')
  analyzeConversation(@Body() body: { messages: any[] }) {
    return this.whatsappService.analyzeConversation(body.messages || []);
  }

  @Post('contacts/match')
  matchContact(@Req() req: any, @Body() body: { phone: string; name: string }) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.matchOrCreateContact(tenantId, userId, body.phone, body.name);
  }

  @Get('templates')
  getTemplates(@Req() req: any) {
    const { tenantId } = this.extractContext(req);
    return this.whatsappService.getTemplates(tenantId);
  }

  @Post('templates')
  createTemplate(@Req() req: any, @Body() body: any) {
    const { tenantId } = this.extractContext(req);
    return this.whatsappService.createTemplate(tenantId, body);
  }

  @Get('automations')
  getAutomations(@Req() req: any) {
    const { tenantId } = this.extractContext(req);
    return this.whatsappService.getAutomations(tenantId);
  }

  @Get('analytics')
  getAnalytics(@Req() req: any) {
    const { tenantId, userId } = this.extractContext(req);
    return this.whatsappService.getAnalytics(tenantId, userId);
  }
}
