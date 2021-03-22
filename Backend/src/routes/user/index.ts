import express, { Router } from "express";

import UserController from "../../controllers/user";
import UserService from "../../services/user";

class UserRoutes {
  private router: Router;
  constructor(userService: UserService) {
    this.router = express.Router();

    const controller = new UserController(userService);

    this.router.post("/delete", controller.delete);
    this.router.get("/get", controller.get);
    this.router.post("/save", controller.save);
  }

  getRouter = () => this.router;
}

export default UserRoutes;
