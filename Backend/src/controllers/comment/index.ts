import { Request, Response, NextFunction } from "express";
import CommentService from "../../services/comment";

class CommentController {
  private commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return this.commentService.delete();
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    return this.commentService.getAll();
  };

  save = async (req: Request, res: Response, next: NextFunction) => {
    return this.commentService.save();
  };
}

export default CommentController;
