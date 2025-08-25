import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
const { combine, timestamp, json, printf } = format;

// Custom format for console logging
const consoleLogFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Format timestamp to IST
const ISTTimestamp = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });
};

// Determine the environment
const isProduction = process.env.NODE_ENV === "production";

// Create a Winston logger
const logger = createLogger({
  level: isProduction ? "warn" : "info", // Use "warn" or "error" in production
  format: combine(
    timestamp({ format: ISTTimestamp }), // Use IST timestamp
    json() // JSON format for structured logging
  ),
  transports: [
    // Console transport for development
    ...(isProduction
      ? []
      : [
          new transports.Console({
            format: combine(timestamp({ format: ISTTimestamp }), consoleLogFormat),
          }),
        ]),
    // Daily rotate file transport for production
    new DailyRotateFile({
      filename: "logs/app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxSize: "20m", // Rotate after 20MB
      maxFiles: "14d", // Keep logs for 14 days
    }),
  ],
});

export default logger;