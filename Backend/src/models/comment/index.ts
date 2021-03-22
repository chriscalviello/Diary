export class Comment {
  id: string;
  title: string;
  body: string;
  created_at: Date;

  constructor(id: string, title: string, body: string) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.created_at = new Date();
  }
}
