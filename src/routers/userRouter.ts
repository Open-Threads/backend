import { Router } from "express";

import UserController from "../controllers/UserController";
import AuthMiddleware from "../common/middlewares/AuthMiddleware";

const userRouter: Router = Router();
const userController: UserController = new UserController();

userRouter.post("/users", (req, res) => userController.create(req, res));
userRouter.get("/users/:uuid", (req, res) => userController.findOne(req, res));
userRouter.get("/users", (req, res) => userController.findMany(req, res));
userRouter.put("/users", AuthMiddleware.middle, (req, res) =>
  userController.update(req, res),
);
userRouter.delete("/users", AuthMiddleware.middle, (req, res) =>
  userController.remove(req, res),
);

export default userRouter;
