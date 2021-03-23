const pathToDb = __dirname + "/../../database/index.json";

var fs = require("fs");

import AuthenticationService from ".";
import { User, LoggedUser } from "../../models/user";
import { Roles } from "../../authorization";

export class FakeAuthenticationService implements AuthenticationService {
  login = (email: string, password: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    const user: User = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) {
      throw "Email or password is incorrect";
    }

    const result: LoggedUser = {
      token: this.getJwtToken(user.id),
      email: user.email,
      id: user.id,
    };

    return result;
  };
  signup = (email: string, password: string, name: string, surname: string) => {
    const data = fs.readFileSync(pathToDb, "utf8");
    const users = JSON.parse(data);

    if (users.find((u: User) => u.email === email)) {
      throw "The provided email is already in use";
    }

    const newUser = new User(email, password, name, surname, Roles.user);
    users.push({ ...newUser });

    fs.writeFileSync(pathToDb, JSON.stringify(users, null, 4), "utf8");

    const result: LoggedUser = {
      token: this.getJwtToken(newUser.id),
      email: newUser.email,
      id: newUser.id,
    };

    return result;
  };
  private getJwtToken = (userId: string) => "fake-jwt-token|" + userId;
}
