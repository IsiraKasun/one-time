const winston = require("winston");

let logger = {}

if (process.env.NODE_ENV === 'production') {
  logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console(), new winston.transports.File({filename: 'logs/test.log'})],
  });
} else {
  logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
  });

}

exports.logInfo = (...params) => {
    params.map((param) => {
        logger.info(param);
    })
}
