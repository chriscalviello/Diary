import express, { Router } from "express";

import { AuthenticationController } from "../../controllers/authentication";
import AuthenticationService from "../../services/authentication";

export class AuthenticationRoutes {
  private router: Router;
  constructor(authenticationService: AuthenticationService) {
    this.router = express.Router();

    const controller = new AuthenticationController(authenticationService);

    this.router.post("/login", controller.login);
    this.router.post("/signup", controller.signup);
    this.router.post("/token", controller.token);
    this.router.post("/logout", controller.logout);
  }

  getRouter = () => this.router;
}
