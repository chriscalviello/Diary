import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import AuthService from "../../services/auth";

class UserController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    return this.authService.delete();
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    return this.authService.get();
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      return next(new HttpError("A 'username' param is required", 500));
    }

    if (!password) {
      return next(new HttpError("A 'password' param is required", 500));
    }

    try {
      const token = this.authService.login(username, password);
      res.json({ token });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) {
      return next(new HttpError("A 'username' param is required", 500));
    }

    if (!password) {
      return next(new HttpError("A 'password' param is required", 500));
    }

    try {
      const token = this.authService.signup(username, password);
      res.json({ token });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };
}

export default UserController;
