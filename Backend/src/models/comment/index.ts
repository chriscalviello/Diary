import { v4 as uuidv4 } from "uuid";
import { User } from "../user";

export class Comment {
  id: string;
  title: string;
  body: string;
  created_at: Date;

  constructor(title: string, body: string) {
    this.id = uuidv4();
    this.title = title;
    this.body = body;
    this.created_at = new Date();
  }
}

export class CommentWithUser extends Comment {
  user: User;

  constructor(comment: Comment, user: User) {
    super(comment.title, comment.body);
    this.id = comment.id;
    this.created_at = comment.created_at;
    this.user = { ...user };
  }
}
