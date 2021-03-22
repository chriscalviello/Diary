import express, { Router } from "express";

import CommentController from "../../controllers/comment";
import CommentService from "../../services/comment";
import UserService from "../../services/user";

class CommentRoutes {
  private router: Router;
  constructor(commentService: CommentService, userService: UserService) {
    this.router = express.Router();

    const controller = new CommentController(commentService, userService);

    this.router.post("/delete", controller.delete);
    this.router.post("/get", controller.get);
    this.router.post("/save", controller.save);
  }

  getRouter = () => this.router;
}

export default CommentRoutes;
