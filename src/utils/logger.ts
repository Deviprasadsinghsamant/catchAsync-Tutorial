import winston from "winston";
import { format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

// Define log format
const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json(),
    logFormat
  ),
  transports: [
    // Console transport
    new winston.transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    // Daily rotating file transport
    new DailyRotateFile({
      filename: "logs/application-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
});

// Stream for morgan (HTTP logging)
export const morganStream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
