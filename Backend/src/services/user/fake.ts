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
  save = () => new User("1", "1", "1", "1", "1");
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
