const winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');
const logzioWinstonTransport = new LogzioWinstonTransport({
  level: 'info',
  name: 'winston_logzio',
  token: 'BiCLBhercITlRHJidJzvrgISYsuyHoaI',
  host: 'listener.logz.io',
});

const logger = winston.createLogger({
  transports: [logzioWinstonTransport]
});

export default logger