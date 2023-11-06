import { IBaseService } from '@app/core/base/interface/base.service.interface';
import { OnModuleInit, OnModuleDestroy, OnApplicationShutdown, Logger, Injectable } from '@nestjs/common';

@Injectable()
export class BaseService implements IBaseService, OnModuleInit, OnModuleDestroy, OnApplicationShutdown {
  constructor(protected readonly className: string) {}

  async onModuleDestroy() {
    Logger.log(`Service event ${this.onModuleDestroy.name} activated.`, this.className);
  }

  async onModuleInit() {
    Logger.log(`Service event ${this.onModuleInit.name} activated.`, this.className);
  }

  async onApplicationShutdown(signal: string) {
    Logger.log(`Service event ${this.onApplicationShutdown.name} activated with signal ${signal}.`, this.className);
  }
}
