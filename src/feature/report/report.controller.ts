import { BaseController } from '@app/core/base/controller/base.controller';
import { CurrentUser } from '@app/core/base/decorator/current.user.decorator';
import { AuthAdminGuard } from '@app/core/base/guard/auth.admin.guard';
import { AuthGuard } from '@app/core/base/guard/auth.guard';
import { ResponseSerialize } from '@app/core/base/interceptor/response.serialize.interceptor';
import { IBaseEntity } from '@app/core/base/interface/base.entity.interface';
import { LogMethod } from '@app/core/base/util/log.utils';
import { CreateReportRequestDto, GetEstimateDto, UpdateReportRequestDto } from '@app/feature/report/dto/report.request.dto';
import { ReportResponseDto } from '@app/feature/report/dto/report.response.dto';
import { ReportEntity } from '@app/feature/report/report.entity';
import { ReportService } from '@app/feature/report/report.service';
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
import { UserEntity } from '@app/shared/user/user.entity';

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
