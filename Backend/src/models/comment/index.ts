import { User } from "../user";

export class Comment {
  id: string;
  title: string;
  body: string;
  created_at: Date;
  user: User;

  constructor(id: string, title: string, body: string, user: User) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.created_at = new Date();
    this.user = user;
  }
}
