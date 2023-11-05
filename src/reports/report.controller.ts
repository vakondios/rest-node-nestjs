import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';

import { BaseController } from '../_base/_controller/base.controller';
import { CurrentUser } from '../_base/_decorator/current.user.decorator';
import { LogMethod } from '../_base/_decorator/log.decorator';
import { AuthAdminGuard } from '../_base/_guard/auth.admin.guard';
import { AuthGuard } from '../_base/_guard/auth.guard';
import { ResponseSerialize } from '../_base/_interceptor/response.serialize.interceptor';
import { IBaseEntity } from '../_base/_interface/base.entity.interface';
import { UserEntity } from '../user/user.entity';

import { CreateReportRequestDto, GetEstimateDto, UpdateReportRequestDto } from './dto/report.request.dto';
import { ReportResponseDto } from './dto/report.response.dto';
import { ReportEntity } from './report.entity';
import { ReportService } from './report.service';

@UseGuards(AuthGuard)
@Controller('reports')
@ResponseSerialize(ReportResponseDto)
export class ReportsController extends BaseController<ReportEntity> {
  constructor(private readonly reportService: ReportService) {
    super(reportService);
  }

  @Post()
  @LogMethod()
  async createReport(
    @CurrentUser() userEntity: UserEntity,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) body: CreateReportRequestDto
  ): Promise<IBaseEntity> {
    return this.reportService.create(body, userEntity);
  }

  @Get('/estimate')
  @LogMethod()
  async getEstimate(@Query(new ValidationPipe({ transform: true })) query: GetEstimateDto) {
    console.log(query);
    return this.reportService.createEstimate(query);
  }

  @UseGuards(AuthAdminGuard)
  @Patch(':id')
  @LogMethod()
  async approved(
    @CurrentUser() UserEntity: UserEntity,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) updateReportRequestDto: UpdateReportRequestDto
  ): Promise<IBaseEntity> {
    return this.reportService.update(id, updateReportRequestDto, UserEntity);
  }
}
/*  */
