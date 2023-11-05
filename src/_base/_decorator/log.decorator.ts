import { Logger } from '@nestjs/common';
import { isObject } from 'class-validator';
import { ClsServiceManager } from 'nestjs-cls';

import { Utils } from '../_helper/utils';

export function LogMethod() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const cls = ClsServiceManager.getClsService();
      const msg = Utils.logMessage(null, cls.get('transId'), 'info', 'Service', this.constructor.name, propertyKey);

      Logger.log('', cls.get('transId') + '-' + this.constructor.name + '-' + propertyKey);

      if (args.length > 0) {
        args.forEach(function (value) {
          if (isObject(value)) {
            const res = JSON.stringify(value);
            if (res !== undefined) {
              msg.message.messages.push(value);
            }
          } else {
            msg.message.messages.push({ value: value });
          }
        });
      }

      msg.header.loglevel = 'debug';
      Logger.debug(JSON.stringify(msg), cls.get('transId') + '-' + this.constructor.name + '-' + propertyKey);

      return targetMethod.apply(this, args);
    };

    return descriptor;
  };
}

export function LogMethod2(note: string, component: string, className: string, functionName: string, ...args: any[]) {
  const cls = ClsServiceManager.getClsService();
  const title = cls.get('transId') + '-' + component + '-' + className + '-' + note;
  const msg = Utils.logMessage(note, cls.get('transId'), 'debug', component, className, functionName);

  if (args.length === 0) {
    Logger.log('', title);
  } else {
    args.forEach(function (value) {
      if (isObject(value)) {
        const res = JSON.stringify(value);
        if (res !== undefined) {
          msg.message.messages.push(value);
        }
      } else {
        msg.message.messages.push({ value: value });
      }
    });
    Logger.debug(JSON.stringify(msg), title);
  }
}

export function LogMethod3(
  note: string,
  component: string,
  className: string,
  functionName: string,
  transactionId: string,
  ...args: any[]
) {
  const title = transactionId + '-' + component + '-' + className + '-' + note;
  const msg = Utils.logMessage(note, transactionId, 'debug', component, className, functionName);

  if (args.length === 0) {
    Logger.log('', title);
  } else {
    args.forEach(function (value) {
      if (isObject(value)) {
        const res = JSON.stringify(value);
        if (res !== undefined) {
          msg.message.messages.push(value);
        }
      } else {
        msg.message.messages.push({ value: value });
      }
    });
    Logger.debug(JSON.stringify(msg), title);
  }
}
