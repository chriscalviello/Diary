import { v4 as uuidv4 } from "uuid";

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
