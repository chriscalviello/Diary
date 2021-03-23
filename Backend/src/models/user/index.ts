import { Comment } from "../comment";
import { Roles } from "../../authorization";

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  surname: string;
  comments: Comment[];
  role: Roles;

  constructor(
    email: string,
    password: string,
    name: string,
    surname: string,
    role: Roles,
    id: string = ""
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.surname = surname;
    this.id = id;
    this.role = role;
    this.comments = [];
  }
}

export class LoggedUser {
  email: string;
  token: string;

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}
