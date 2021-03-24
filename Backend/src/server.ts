import { FakeAuthenticationService } from "./services/authentication/fake";
import { FakeDatabaseService } from "./services/database/fake";
import { FakeCommentService } from "./services/comment/fake";
import { FakeUserService } from "./services/user/fake";
import App from "./app";

const databaseService = new FakeDatabaseService();

const app = new App(
  5000,
  new FakeUserService(databaseService),
  new FakeCommentService(databaseService),
  new FakeAuthenticationService(databaseService)
);

app.start();
