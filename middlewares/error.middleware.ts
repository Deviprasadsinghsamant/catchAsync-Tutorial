import { ErrorRequestHandler } from "express";
import { KitchenError } from "../domains/kitchen/errors/KitchenError";
import logger from "../src/utils/logger";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof KitchenError) {
    logger.error(`Kitchen Error: ${err.message}`);
    res.status(err.statusCode).json({
      error: err.message,
      solution: err.solutionHint,
    });
    return;
  }

  logger.error(`Unexpected Error: ${err.message}`);
  res.status(500).json({
    error: "Something went wrong",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
