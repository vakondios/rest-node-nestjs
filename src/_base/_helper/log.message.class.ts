export class LogMessageMessageClass {
  messages: object[];
}

export class LogMessageHeaderClass {
  application: string;
  datetime: string;
  loglevel: string;
  component: string;
  componentnote: string;
  class: string;
  function: string;
}

export class LogMessageClass {
  transactionid: string;
  header: LogMessageHeaderClass;
  message: LogMessageMessageClass;
}
