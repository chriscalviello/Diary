import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import CommentService from "../../services/comment";
import UserService from "../../services/user";
import { Roles } from "../../authorization";

class CommentController {
  private commentService: CommentService;
  private userService: UserService;

  constructor(commentService: CommentService, userService: UserService) {
    this.commentService = commentService;
    this.userService = userService;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.body.id;
    if (!commentId) {
      return next(new HttpError("A 'id' param is required", 500));
    }

    try {
      const comment = this.commentService.getById(commentId);
      if (!comment) {
        return next(new HttpError("Comment not found", 500));
      }
      if (req.user.role === "USER" && req.user.id !== comment.userId) {
        return next(
          new HttpError(
            "You are not allowed to delete other user's comments",
            403
          )
        );
      }

      this.commentService.delete(commentId);

      res.json();
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  getById = async (req: Request, res: Response, next: NextFunction) => {
    const commentId = req.query.id as string;

    if (!commentId) {
      return next(new HttpError("A 'id' param is required", 500));
    }

    try {
      const comment = this.commentService.getById(commentId);
      if (comment && req.user.role === Roles.user) {
        const userComment = req.user.comments.find((c) => c.id === comment.id);
        if (!userComment) {
          return next(new HttpError("Forbidden", 403));
        }
      }

      res.json({ comment: comment });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user.role === Roles.admin) {
        const comments = this.commentService.getAll();

        res.json({ comments: comments });
      } else {
        const comments = this.commentService.getByUser(req.user.id);
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
