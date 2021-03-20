import express, { Router } from "express";

import CommentController from "../../controllers/comment";
import CommentService from "../../services/comment";

class CommentRoutes {
  private router: Router;
  constructor(commentService: CommentService) {
    this.router = express.Router();

    const controller = new CommentController(commentService);

    this.router.get("/delete", controller.delete);
    this.router.post("/get", controller.get);
    this.router.get("/save", controller.save);
  }

  getRouter = () => this.router;
}

export default CommentRoutes;
