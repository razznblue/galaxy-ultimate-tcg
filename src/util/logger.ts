import { createLogger, transports, format } from 'winston';

const colors = {
  debug: "magenta",
  info: "cyan",
  warning: "yellow",
  error: "bold red",
};

const LOGGER = createLogger({
  transports: [
    new transports.Console({
      level: process.env.LOG_LEVEL || 'info',
      format: format.combine(
        format.colorize({
          all: true,
          colors: colors
        }),
        format.timestamp(), 
        format.simple()
      ),
    })
  ]
})

export default LOGGER;