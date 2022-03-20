import config from "./config";
import { NextFunction, Request, Response } from "express";
import { Account } from "./models";

export function sendResponse(res: Response, status = true, code: any, message: any, data = {}, error = {}) {
  return res.status(code).json({
    status,
    message,
    data,
    error,
  });
}
