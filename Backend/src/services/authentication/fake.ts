import DatabaseService from "../database";
import AuthenticationService from ".";
import { User, LoggedUser } from "../../models/user";
import { Roles } from "../../authorization";

export class FakeAuthenticationService implements AuthenticationService {
  private databaseService: DatabaseService;
  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
  }

  login = (email: string, password: string) => {
    const users = this.databaseService.getUsers();

    const user = users.find(
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
    const users = this.databaseService.getUsers();

    if (users.find((u: User) => u.email === email)) {
      throw "The provided email is already in use";
    }

    const newUser = new User(email, password, name, surname, Roles.user);
    users.push({ ...newUser });

    this.databaseService.updateData(users);

    const result: LoggedUser = {
      token: this.getJwtToken(newUser.id),
      email: newUser.email,
      id: newUser.id,
    };

    return result;
  };
  private getJwtToken = (userId: string) => "fake-jwt-token|" + userId;
}
