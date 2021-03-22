import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import UserService from "../../services/user";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return this.userService.delete();
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      res.sendStatus(403);
      return;
    }

    const userId = token.split("-")[3];

    try {
      const user = this.userService.getById(userId);

      res.json({ user });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  save = async (req: Request, res: Response, next: NextFunction) => {
    return this.userService.save();
  };
}

export default UserController;
