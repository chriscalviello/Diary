import express, { Router } from "express";

import CommentController from "../../controllers/comment";
import CommentService from "../../services/comment";
import { AllowRouteTo, Roles } from "../../authorization";

class CommentRoutes {
  private router: Router;
  constructor(commentService: CommentService) {
    this.router = express.Router();

    const controller = new CommentController(commentService);

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
