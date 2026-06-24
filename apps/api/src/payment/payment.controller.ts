import { Controller, Get, Post, Body, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RequireRoles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('api/v1/payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @RequireRoles('SuperAdmin', 'RegionalAdmin', 'PropertyManager', 'FinanceManager')
  create(@Body(ValidationPipe) createPaymentDto: CreatePaymentDto, @CurrentUser() user: any) {
    return this.paymentService.create(createPaymentDto, user.tenantId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.paymentService.findAll(user.tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: any) {
    return this.paymentService.findOne(id, user.tenantId);
  }
}
