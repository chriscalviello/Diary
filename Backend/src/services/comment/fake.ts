const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import CommentService from ".";
import { Comment } from "../../models/comment";
import { User } from "../../models/user";

export class FakeCommentService implements CommentService {
  delete = () => {};
  save = () => new Comment("1", "", "");
  getAll = (userId: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const user: User = users.find((u: User) => u.id === userId);
    if (!user) {
      throw "The provided user doesn't exist";
    }

    return user.comments;
  };
  getByUser = (id: string) => [];
}
