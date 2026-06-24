import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SearchModule } from './search/search.module';
import { TenantContextMiddleware } from './tenant/tenant.middleware';
import { AuthModule } from './auth/auth.module';

import { PortfolioModule } from './portfolio/portfolio.module'; 
import { PropertyModule } from './property/property.module';
import { BlockModule } from './block/block.module'; 
import { TowerModule } from './tower/tower.module';
import { FloorModule } from './floor/floor.module';
import { UnitModule } from './unit/unit.module';
import { ResidentModule } from './resident/resident.module';
import { CrmModule } from './crm/crm.module';

@Module({
  imports: [
    PrismaModule, 
    DashboardModule, 
    SearchModule, 
    AuthModule,
    PortfolioModule,
    PropertyModule,
    BlockModule,
    TowerModule,
    FloorModule,
    UnitModule,
    ResidentModule,
    CrmModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantContextMiddleware).forRoutes('*');
  }
}
