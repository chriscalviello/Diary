import { v4 as uuidv4 } from "uuid";
import { User } from "../user";

export class Comment {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  userId: string;

  constructor(title: string, body: string, userId: string) {
    this.id = uuidv4();
    this.title = title;
    this.body = body;
    this.created_at = new Date();
    this.userId = userId;
  }
}

export class CommentWithUser extends Comment {
  user: User;

  constructor(
    id: string,
    title: string,
    body: string,
    createdAt: Date,
    user: User
  ) {
    super(title, body, user && user.id);
    this.id = id;
    this.created_at = createdAt;
    this.user = new User(
      user.email,
      user.password,
      user.name,
      user.surname,
      user.role
    );
    this.user.id = user.id;
  }
}
