const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import UserService from ".";
import { User } from "../../models/user";

export class FakeUserService implements UserService {
  delete = () => {};
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
