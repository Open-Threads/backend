import { Router } from "express";

import UserController from "../controllers/UserController";

const userRouter: Router = Router();
const userController: UserController = new UserController();

userRouter.post("/users", (req, res) => userController.create(req, res));
userRouter.get("/users/:uuid", (req, res) => userController.findOne(req, res));
userRouter.get("/users", (req, res) => userController.findMany(req, res));
userRouter.put("/users", (req, res) => userController.update(req, res));
userRouter.delete("/users", (req, res) => userController.remove(req, res));

export default userRouter;
