const pathToDb = __dirname + "/../../database/index.json";
var fs = require("fs");

import { Comment, CommentWithUser } from "../../models/comment";
import { User } from "../../models/user";

import DatabaseService from ".";

export class FakeDatabaseService implements DatabaseService {
  getComments = () => {
    const users = this.getUsers();

    const comments = users.map((u: User) =>
      this.fixUserRelation(u, u.comments)
    );

    return comments.flat();
  };
  getUsers = () => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data) as User[];

    return users;
  };

  updateData = (data: User[]) => {
    fs.writeFileSync(pathToDb, JSON.stringify(data, null, 4), "utf8");
  };

  private fixUserRelation = (user: User, comments: Comment[]) => {
    return comments.map((c: Comment) => {
      return new CommentWithUser(c.id, c.title, c.body, user);
    });
  };
}
