import { NextFunction, Request, Response } from "express";

export function isAllowedMediaFormat(type: any) {
  const types: any = {
    jpg: true,
    jpeg: true,
    png: true,
  };

  return types[type];
}
