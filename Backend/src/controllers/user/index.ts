import { Request, Response, NextFunction } from "express";
import HttpError from "../../models/httpError";
import UserService from "../../services/user";
import { Roles } from "../../authorization";

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

    const currentUserId = token.split("-")[3];
    const userId = req.query.id as string;

    try {
      const currentUser = this.userService.getById(currentUserId);
      if (!currentUser) {
        return next(new HttpError("You are not allowed to read users", 403));
      }

      if (userId) {
        const user = this.userService.getById(userId);
        if (!user) {
          return next(new HttpError("User does not exist", 500));
        }
        res.json({ users: [user] });
      } else {
        const users = this.userService.getAll();
        res.json({ users });
      }
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };

  getRoles = (req: Request, res: Response, next: NextFunction) => {
    res.json({ roles: Roles });
  };

  save = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const role = req.body.role as string;

    if (!email) {
      return next(new HttpError("A 'email' param is required", 500));
    }

    if (!name) {
      return next(new HttpError("A 'name' param is required", 500));
    }

    if (!surname) {
      return next(new HttpError("A 'surname' param is required", 500));
    }

    if (!role) {
      return next(new HttpError("A 'role' param is required", 500));
    }

    const mappedRole = Object.values(Roles).find((r) => r === role);
    if (!mappedRole) {
      return next(
        new HttpError("The provided user's role is not recognized", 500)
      );
    }

    const userId = req.body.id as string;

    try {
      if (userId) {
        if (req.user.role === "USER" && req.user.id !== userId) {
          return next(
            new HttpError("You are not allowed to edit other users", 403)
          );
        }

        const user = this.userService.edit(
          email,
          name,
          surname,
          userId,
          mappedRole
        );
        res.json({ user });
      } else {
        if (req.user.role === "USER") {
          return next(
            new HttpError("You are not allowed to create users", 403)
          );
        }

        const password = req.body.password;
        if (!password) {
          return next(new HttpError("A 'password' param is required", 500));
        }

        const user = this.userService.create(
          email,
          password,
          name,
          surname,
          mappedRole
        );

        res.json({ user });
      }
    } catch (err) {
      return next(new HttpError(err, 500));
    }
  };
}

export default UserController;
