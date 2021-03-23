import express, { Router } from "express";

import UserController from "../../controllers/user";
import UserService from "../../services/user";
import { AllowRouteTo, Roles } from "../../authorization";

class UserRoutes {
  private router: Router;
  constructor(userService: UserService) {
    this.router = express.Router();

    const controller = new UserController(userService);

    this.router.post("/delete", AllowRouteTo([Roles.admin]), controller.delete);
    this.router.get("/get", AllowRouteTo([Roles.admin]), controller.get);
    this.router.get(
      "/getRoles",
      AllowRouteTo([Roles.admin]),
      controller.getRoles
    );
    this.router.post("/save", AllowRouteTo([Roles.admin]), controller.save);
  }

  getRouter = () => this.router;
}

export default UserRoutes;
