import { Request, Response, NextFunction } from "express";
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
    return this.userService.getAll();
  };

  save = async (req: Request, res: Response, next: NextFunction) => {
    return this.userService.save();
  };
}

export default UserController;
