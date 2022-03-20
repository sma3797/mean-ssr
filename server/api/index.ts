import { Router } from "express";
import user from "./user";

const router: Router = Router();
router.use("/user", user);

/**
 * Send 404 Json response on api routes
 */
router.use((req, res, next) => {
  res.status(404).send({ status: false, message: "Not found" });
});

export default router;
