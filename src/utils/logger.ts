import config from "config";
import { existsSync, mkdirSync } from "fs";
import { createLogger, format, transports } from "winston";
import winstonDaily from "winston-daily-rotate-file";
import { join } from "path";

const { combine, timestamp, label, splat, colorize } = format;

//Log directory
const LogDir = join(__dirname, config.get<string>("LOG_DIR"));

if (!existsSync(LogDir)) {
  mkdirSync(LogDir);
}

const logFormat = format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`
);
export const logger = createLogger({
  format: combine(
    timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    logFormat
  ),
  transports: [
    //debug log setting
    new winstonDaily({
      level: "debug",
      datePattern: "YYYY-MM-DD",
      dirname: LogDir + "/debug",
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),

    // error logs
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: LogDir + "/error",
      filename: `%DATE%.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
  ],
});

logger.add(
  new transports.Console({
    format: combine(splat(), colorize({ all: true })),
  })
);

export const stream = {
  write: (message: string) => {
    logger.info(message.substring(0, message.lastIndexOf("\n")));
  },
};
