import { Router } from "express";
import UserController from "./user.controller";

const router: Router = Router();

router.get("/checkRoute", UserController.checkRoute.bind(UserController));

export default router;
