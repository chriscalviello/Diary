const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import CommentService from ".";
import { Comment } from "../../models/comment";
import { User } from "../../models/user";

export class FakeCommentService implements CommentService {
  delete = (userId: string, id: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const user: User = users.find((u: User) => u.id === userId);
    if (!user) {
      throw "The provided user doesn't exist";
    }

    const commentIndex = user.comments.findIndex((c) => c.id === id);
    if (commentIndex === -1) {
      throw "The privded comment doesn't exist";
    }
    user.comments.splice(commentIndex, 1);

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");
  };
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
        body,
        user
      );
      user.comments.push(comment);

      fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

      return comment;
    }
  };
  getAll = () => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const comments: Comment[] = users.map((u: User) =>
      this.fixUserRelation(u, u.comments)
    );

    return comments
      .flat()
      .sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  };
  getById = (id: string) => {
    const comments = this.getAll();

    return comments.find((c: Comment) => c.id === id);
  };
  getByUser = (id: string) => {
    const comments = this.getAll();

    return comments
      .filter((c) => c.user.id === id)
      .sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  };
  private fixUserRelation = (user: User, comments: Comment[]) => {
    return comments.map((c: Comment) => {
      return { ...c, user };
    });
  };
}
