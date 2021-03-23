const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import UserService from ".";
import { User } from "../../models/user";
import { Roles } from "../../authorization";

export class FakeUserService implements UserService {
  delete = (id: string) => {
    const users = this.getAll();

    const userIndex = users.findIndex((u: User) => u.id === id);
    if (userIndex === -1) {
      throw "The provided user doesn't exist";
    }
    users.splice(userIndex, 1);

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");
  };
  create = (
    email: string,
    password: string,
    name: string,
    surname: string,
    role: Roles
  ) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const newUser = new User(email, password, name, surname, role);
    users.push({ ...newUser });

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

    return newUser;
  };
  edit = (
    email: string,
    name: string,
    surname: string,
    id: string,
    role: Roles
  ) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const user = users.find((u: User) => u.id === id);
    if (!user) {
      throw "The provided user doesn't exist";
    }
    user.email = email;
    user.name = name;
    user.surname = surname;
    user.role = role;

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

    return user;
  };
  getAll = () => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    return users.map((u: User) => u);
  };
  getById = (id: string) => {
    const users = this.getAll();

    return users.find((u: User) => u.id === id);
  };
  getByToken = (token: string) => {
    const userId = token.split("-")[3];
    return this.getById(userId);
  };
}
