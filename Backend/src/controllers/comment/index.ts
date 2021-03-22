import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import CommentService from "../../services/comment";
import UserService from "../../services/user";

class CommentController {
  private commentService: CommentService;
  private userService: UserService;

  constructor(commentService: CommentService, userService: UserService) {
    this.commentService = commentService;
    this.userService = userService;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new HttpError("You are not allowed to delete comments", 403));
    }

    const userId = token.split("-")[3];

    const commentId = req.body.id;

    try {
      this.commentService.delete(userId, commentId);

      res.json();
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new HttpError("You are not allowed to read comments", 403));
    }

    const userId = token.split("-")[3];

    const commentId = req.body.id;

    try {
      if (commentId) {
        const user = this.userService.getById(userId);
        const comments = user.comments.filter((c) => c.id === commentId);

        res.json({ comments: comments });
      } else {
        const comments = this.commentService.getAll(userId);
        res.json({ comments });
      }
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  save = async (req: Request, res: Response, next: NextFunction) => {
    const title = req.body.title;
    const text = req.body.text;
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new HttpError("You are not allowed to edit comments", 403));
    }

    const userId = token.split("-")[3];
    const commentId = req.body.id;

    if (!title) {
      return next(new HttpError("A 'title' param is required", 500));
    }

    if (!text) {
      return next(new HttpError("A 'comment' param is required", 500));
    }

    try {
      const comment = this.commentService.save(userId, title, text, commentId);

      res.json({ comment });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };
}

export default CommentController;
