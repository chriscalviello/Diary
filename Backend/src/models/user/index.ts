import { Comment } from "../comment";

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  surname: string;
  comments: Comment[];

  constructor(
    email: string,
    password: string,
    name: string,
    surname: string,
    id: string = ""
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.surname = surname;
    this.id = id;
    this.comments = [];
  }
}
