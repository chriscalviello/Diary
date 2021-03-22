import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import UserService from "../../services/user";

class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new HttpError("You are not allowed to delete comments", 403));
    }

    const currentUserId = token.split("-")[3];

    const userId = req.body.id;

    try {
      this.userService.delete(currentUserId, userId);

      res.json();
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return next(new HttpError("You are not allowed to read users", 403));
    }

    const userId = token.split("-")[3];

    try {
      const user = this.userService.getById(userId);
      if (!user) {
        return next(new HttpError("You are not allowed to read users", 403));
      }

      const users = this.userService.getAll();
      console.log("USERS", users);
      res.json({ users });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  save = async (req: Request, res: Response, next: NextFunction) => {
    return this.userService.save("", "", "", "", "");
  };
}

export default UserController;
