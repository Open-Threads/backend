import { Router } from "express";

import AuthMiddleware from "../common/middlewares/AuthMiddleware";
import AuthServiceController from "../controllers/AuthServiceController";

const authRouter: Router = Router();
const authServiceController: AuthServiceController =
  new AuthServiceController();

authRouter.post("/auth", (req, res) => authServiceController.auth(req, res));
authRouter.get("/auth/getMe", AuthMiddleware.middle, (req, res) =>
  authServiceController.getMe(req, res),
);

export default authRouter;
