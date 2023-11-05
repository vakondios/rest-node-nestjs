import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportsController } from './report.controller';
import { ReportEntity } from './report.entity';
import { ReportService } from './report.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportsController],
  providers: [ReportService],
})
export class ReportsModule {}
