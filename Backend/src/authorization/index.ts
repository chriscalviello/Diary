import { Request, Response, NextFunction } from "express";

export const AllowRouteTo = (allowedRoles: Roles[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (user && allowedRoles.includes(user.role)) {
      next();
    } else {
      res.status(403).json({ message: "You are not allowed" });
    }
  };
};

export enum Roles {
  user = "USER",
  admin = "ADMIN",
}

export enum Actions {
  upsert = "UPSERT",
  read = "READ",
  delete = "DELETE",
}
