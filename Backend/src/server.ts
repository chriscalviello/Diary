import { FakeAuthService } from "./services/auth/fake";
import { FakeCommentService } from "./services/comment/fake";
import { FakeUserService } from "./services/user/fake";
import App from "./app";

const app = new App(
  5000,
  new FakeUserService(),
  new FakeCommentService(),
  new FakeAuthService()
);

app.start();
