import { FakeAuthenticationService } from "./services/authentication/fake";
import { FakeCommentService } from "./services/comment/fake";
import { FakeUserService } from "./services/user/fake";
import App from "./app";

const app = new App(
  5000,
  new FakeUserService(),
  new FakeCommentService(),
  new FakeAuthenticationService()
);

app.start();
