import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import AuthenticationService from "../../services/authentication";

export class AuthenticationController {
  private authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return next(new HttpError("A 'email' param is required", 500));
    }

    if (!password) {
      return next(new HttpError("A 'password' param is required", 500));
    }

    try {
      const user = this.authenticationService.login(email, password);
      res.json({ user });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  signup = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const surname = req.body.surname;

    if (!email) {
      return next(new HttpError("A 'email' param is required", 500));
    }

    if (!password) {
      return next(new HttpError("A 'password' param is required", 500));
    }

    if (!name) {
      return next(new HttpError("A 'name' param is required", 500));
    }

    if (!surname) {
      return next(new HttpError("A 'surname' param is required", 500));
    }

    try {
      const user = this.authenticationService.signup(
        email,
        password,
        name,
        surname
      );
      res.json({ user });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };
}
