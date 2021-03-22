const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import UserService from ".";
import { User } from "../../models/user";

export class FakeUserService implements UserService {
  delete = (curentUserId: string, id: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const currentUser: User = users.find((u: User) => u.id === curentUserId);
    if (!currentUser) {
      throw "The provided user doesn't exist";
    }

    const userIndex = users.findIndex((u: User) => u.id === id);
    if (userIndex === -1) {
      throw "The provided user doesn't exist";
    }
    users.splice(userIndex, 1);

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");
  };
  create = (email: string, password: string, name: string, surname: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const newUser = new User(email, password, name, surname, users.length + 1);
    users.push({ ...newUser });

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

    return newUser;
  };
  edit = (email: string, name: string, surname: string, id: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const user = users.find((u: User) => u.id === id);
    if (!user) {
      throw "The provided user doesn't exist";
    }
    user.email = email;
    user.name = name;
    user.surname = surname;

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
}
