import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../../middleware";

const UserController = (() => {
  const checkRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      return sendResponse(res, true, 200, res.__("ROUTE_CHECK"));
    } catch (error) {
      return sendResponse(res, false, 500, res.__("INTERNAL_SERVER_ERROR"));
    }
  };

  return {
    checkRoute,
  };
})();

export default UserController;
