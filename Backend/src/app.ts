import express, { Request, Response, NextFunction } from "express";

import HttpError from "./models/httpError";

import AuthRoutes from "./routes/auth";
import CommentRoutes from "./routes/comment";
import UserRoutes from "./routes/user";

import AuthService from "./services/auth";
import CommentService from "./services/comment";
import UserService from "./services/user";

import LogService from "./services/log";

class App {
  public app: express.Application;
  public port: number;
  private userService: UserService;
  private commentService: CommentService;
  private authService: AuthService;

  constructor(
    port: number,
    userService: UserService,
    commentService: CommentService,
    authService: AuthService
  ) {
    this.app = express();

    this.port = port;
    this.userService = userService;
    this.commentService = commentService;
    this.authService = authService;

    this.configureServerAndRoutes();
  }

  public start = async () => {
    try {
      this.listen();
    } catch (err) {
      LogService.error(["Fail", err]);
    }
  };

  private listen() {
    this.app.listen(this.port, () => {
      LogService.write([`App listening on the port ${this.port}`], "green");
    });
  }

  private configureServerAndRoutes = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

      next();
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (token) {
        req.user = this.userService.getByToken(token);
      }

      next();
    });

    this.app.use("/api/auth", new AuthRoutes(this.authService).getRouter());

    this.app.use("/api/users", new UserRoutes(this.userService).getRouter());
    this.app.use(
      "/api/comments",
      new CommentRoutes(this.commentService, this.userService).getRouter()
    );

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new HttpError("Could not find this route.", 404);
      throw error;
    });

    this.app.use(
      (error: any, req: Request, res: Response, next: NextFunction) => {
        if (res.headersSent) {
          return next(error);
        }
        res.status(error.code || 500);
        res.json({ message: error.message || "An unknown error occurred!" });
      }
    );
  };
}

export default App;
