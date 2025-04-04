import { AsyncRequestHandler } from "../types/AsyncHandle";
import { Request, Response, NextFunction } from "express";

export const catchAsync = (fn: AsyncRequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
