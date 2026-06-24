import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { DocumentService } from './document.service';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  getDocuments(@Req() req: any) {
    return this.documentService.getDocuments(req['tenantId']);
  }

  @Post()
  uploadDocument(@Req() req: any, @Body() body: any) {
    return this.documentService.uploadDocument(req['tenantId'], body);
  }
}
