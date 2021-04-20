import DatabaseService from "../database";
import AuthenticationService from ".";
import { User, LoggedUser } from "../../models/user";
import { Roles } from "../../authorization";
import jwt from "jsonwebtoken";

export class FakeAuthenticationService implements AuthenticationService {
  private databaseService: DatabaseService;
  private accessTokenSecret: string;
  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
    this.accessTokenSecret = "accesstokensecret";
  }

  login = (email: string, password: string) => {
    const users = this.databaseService.getUsers();

    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) {
      throw "Email or password is incorrect";
    }

    return new LoggedUser(user, this.getJwtToken(user));
  };
  signup = (email: string, password: string, name: string, surname: string) => {
    const users = this.databaseService.getUsers();

    if (users.find((u: User) => u.email === email)) {
      throw "The provided email is already in use";
    }

    const newUser = new User(email, password, name, surname, Roles.user);
    users.push({ ...newUser });

    this.databaseService.updateData(users);

    return new LoggedUser(newUser, this.getJwtToken(newUser));
  };
  getUserIdByToken = (token: string) => {
    const authUser = jwt.verify(token, this.accessTokenSecret) as LoggedUser;

    return authUser.id;
  };
  private getJwtToken = (user: User) =>
    jwt.sign({ ...new LoggedUser(user, "") }, this.accessTokenSecret);
}
