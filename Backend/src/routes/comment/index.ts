import express, { Router } from "express";

import CommentController from "../../controllers/comment";
import CommentService from "../../services/comment";
import UserService from "../../services/user";
import { AllowRouteTo, Roles } from "../../authorization";

class CommentRoutes {
  private router: Router;
  constructor(commentService: CommentService, userService: UserService) {
    this.router = express.Router();

    const controller = new CommentController(commentService, userService);

    this.router.post(
      "/delete",
      AllowRouteTo([Roles.user, Roles.admin]),
      controller.delete
    );
    this.router.get(
      "/get",
      AllowRouteTo([Roles.user, Roles.admin]),
      controller.get
    );
    this.router.get(
      "/getById",
      AllowRouteTo([Roles.user, Roles.admin]),
      controller.getById
    );
    this.router.post(
      "/save",
      AllowRouteTo([Roles.user, Roles.admin]),
      controller.save
    );
  }

  getRouter = () => this.router;
}

export default CommentRoutes;
