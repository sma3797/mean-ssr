import { NextFunction, Request, Response, ErrorRequestHandler } from "express";

const preInit = (app: any) => {
  app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(err);
  });
};

export default preInit;
