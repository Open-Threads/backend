import { Router } from "express";

import AuthMiddleware from "../common/middlewares/AuthMiddleware";
import IssueController from "../controllers/IssueController";

const issueRouter: Router = Router();
const issueController: IssueController = new IssueController();

issueRouter.post("/issues", AuthMiddleware.middle, (req, res) =>
  issueController.create(req, res),
);
issueRouter.get("/issues", (req, res) => issueController.findMany(req, res));
issueRouter.get("/issues/:uuid", (req, res) =>
  issueController.findOne(req, res),
);
issueRouter.put("/issues/:uuid", AuthMiddleware.middle, (req, res) =>
  issueController.update(req, res),
);
issueRouter.delete("/issues/:uuid", AuthMiddleware.middle, (req, res) =>
  issueController.remove(req, res),
);
issueRouter.post(
  "/issues/:uuid/:direction",
  AuthMiddleware.middle,
  (req, res) => issueController.vote(req, res),
);

export default issueRouter;
