import * as bcrypt from 'bcrypt';

import { LogMessageClass, LogMessageHeaderClass, LogMessageMessageClass } from './log.message.class';

export class Utils {
  public static logMessage(
    note: string,
    transactionid: string,
    logLevel: string,
    component: string,
    className: string,
    functionName: string,
    ...messages: object[]
  ): LogMessageClass {
    const ret = new LogMessageClass();
    const retHeader = new LogMessageHeaderClass();
    const retMessage = new LogMessageMessageClass();

    ret.transactionid = transactionid;
    retHeader.application = 'VCRM';
    retHeader.class = className;
    retHeader.component = component;
    retHeader.datetime = new Date().toISOString();
    retHeader.function = functionName;
    retHeader.loglevel = logLevel;
    retHeader.componentnote = note;
    ret.header = retHeader;

    retMessage.messages = messages;
    ret.message = retMessage;

    return ret;
  }

  public static logMessageClear(msg: LogMessageClass, method: string): LogMessageClass {
    msg.message.messages.splice(0);
    msg.header.function = method;

    return msg;
  }

  public static async hashPassword(password: string, salt: number): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async getSalt() {
    return await bcrypt.genSalt();
  }
}
