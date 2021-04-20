import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import AuthenticationService from "../../services/authentication";

export class AuthenticationController {
  private authenticationService: AuthenticationService;

  constructor(authenticationService: AuthenticationService) {
    this.authenticationService = authenticationService;
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

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
    const { email, password, name, surname } = req.body;

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

  token = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    if (!token) {
      return next(new HttpError("A 'token' param is required", 500));
    }

    try {
      const user = this.authenticationService.refreshToken(token);
      res.json({ user });
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;

    if (!token) {
      return next(new HttpError("A 'token' param is required", 500));
    }

    try {
      const user = this.authenticationService.logout(token);
      res.send("Logout successful");
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };
}
