import { Module } from '@nestjs/common';
import { ReportsController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportEntity } from './report.entity';

@Module({
  imports :[TypeOrmModule.forFeature([ReportEntity])],
  controllers: [ReportsController],
  providers: [ReportService]
})
export class ReportsModule {}
