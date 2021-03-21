import express, { Router } from "express";

import AuthController from "../../controllers/auth";
import AuthService from "../../services/auth";

class AuthRoutes {
  private router: Router;
  constructor(authService: AuthService) {
    this.router = express.Router();

    const controller = new AuthController(authService);

    this.router.get("/delete", controller.delete);
    this.router.post("/get", controller.get);
    this.router.post("/login", controller.login);
    this.router.post("/signup", controller.signup);
  }

  getRouter = () => this.router;
}

export default AuthRoutes;
