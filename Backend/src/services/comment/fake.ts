const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import CommentService from ".";
import { Comment } from "../../models/comment";
import { User } from "../../models/user";

export class FakeCommentService implements CommentService {
  delete = () => {};
  save = (userId: string, title: string, body: string, id: string | null) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const user: User = users.find((u: User) => u.id === userId);
    if (!user) {
      throw "The provided user doesn't exist";
    }

    if (id) {
      const comment = user.comments.find((c) => c.id === id);
      if (!comment) {
        throw "The privded comment doesn't exist";
      }
      comment.body = body;
      comment.title = title;

      fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

      return comment;
    } else {
      const comment = new Comment(
        (user.comments.length + 1).toString(),
        title,
        body
      );
      user.comments.push(comment);

      fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

      return comment;
    }
  };
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
