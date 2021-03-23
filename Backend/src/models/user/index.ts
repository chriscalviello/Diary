import { Comment } from "../comment";
import { Roles } from "../../authorization";
import { v4 as uuidv4 } from "uuid";

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
    role: Roles
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.surname = surname;
    this.id = uuidv4();
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
