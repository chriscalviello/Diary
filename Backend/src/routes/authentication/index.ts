import express, { Router } from "express";

import { AuthenticationController } from "../../controllers/authentication";
import AuthenticationService from "../../services/authentication";

export class AuthenticationRoutes {
  private router: Router;
  constructor(authenticationService: AuthenticationService) {
    this.router = express.Router();

    const controller = new AuthenticationController(authenticationService);

    this.router.get("/delete", controller.delete);
    this.router.post("/get", controller.get);
    this.router.post("/login", controller.login);
    this.router.post("/signup", controller.signup);
  }

  getRouter = () => this.router;
}
