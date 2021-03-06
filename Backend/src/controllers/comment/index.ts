import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import CommentService from "../../services/comment";
import { Roles } from "../../authorization";

class CommentController {
  private commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new HttpError("You are not authorized", 403));
    }

    const commentId = req.body.id;
    if (!commentId) {
      return next(new HttpError("A 'id' param is required", 500));
    }

    try {
      const comment = this.commentService.getById(commentId);
      if (!comment) {
        return next(new HttpError("Comment not found", 500));
      }
      if (req.user.id !== comment.user.id) {
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
    if (!req.user) {
      return next(new HttpError("You are not authorized", 403));
    }

    const commentId = req.query.id as string;

    if (!commentId) {
      return next(new HttpError("A 'id' param is required", 500));
    }

    try {
      const comment = this.commentService.getById(commentId);
      if (comment && req.user.role === Roles.user) {
        if (comment.user.id !== req.user.id) {
          return next(new HttpError("Forbidden", 403));
        }
      }

      res.json({ comment: comment });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new HttpError("You are not authorized", 403));
    }

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
    if (!req.user) {
      return next(new HttpError("You are not authorized", 403));
    }
    const userId = req.user.id;

    const { title, text, id } = req.body;

    if (!title) {
      return next(new HttpError("A 'title' param is required", 500));
    }

    if (!text) {
      return next(new HttpError("A 'comment' param is required", 500));
    }

    try {
      if (id) {
        const storedComment = this.commentService.getById(id);
        if (!storedComment) {
          return next(new HttpError("Comment not found", 500));
        }
        if (userId !== storedComment.user.id) {
          return next(
            new HttpError(
              "You are not allowed to edit other user's comments",
              403
            )
          );
        }
      }

      const comment = this.commentService.save(userId, title, text, id);

      res.json({ comment });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };
}

export default CommentController;
