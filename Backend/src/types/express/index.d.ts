declare namespace Express {
  interface Request {
    user: import("../../models/user").LoggedUser | undefined;
  }
}
