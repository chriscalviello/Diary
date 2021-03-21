const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import AuthService from ".";
import { User } from "../../models/user";

export class FakeAuthService implements AuthService {
  delete = () => {};
  login = (email: string, password: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) {
      throw "Email or password is incorrect";
    }

    return "fake-jwt-token-" + user.id;
  };
  signup = (email: string, password: string, name: string, surname: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    if (users.find((u: User) => u.email === email)) {
      throw "The provided email is already in use";
    }

    const newUser = new User(email, password, name, surname, users.length + 1);
    users.push({ ...newUser });

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

    return "fake-jwt-token-" + newUser.id;
  };
  get = () => [];
}
