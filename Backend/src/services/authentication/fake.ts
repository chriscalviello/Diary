import DatabaseService from "../database";
import AuthenticationService from ".";
import { User, LoggedUser } from "../../models/user";
import { Roles } from "../../authorization";
import jwt from "jsonwebtoken";

export class FakeAuthenticationService implements AuthenticationService {
  private databaseService: DatabaseService;
  private accessTokenSecret: string;
  private refreshTokenSecret: string;
  private refreshTokens: Record<string, string>;

  constructor(databaseService: DatabaseService) {
    this.databaseService = databaseService;
    this.accessTokenSecret = "accesstokensecret";
    this.refreshTokenSecret = "refreshtokensecret";
    this.refreshTokens = {};
  }

  login = (email: string, password: string) => {
    const users = this.databaseService.getUsers();

    const user = users.find(
      (u: User) => u.email === email && u.password === password
    );
    if (!user) {
      throw "Email or password is incorrect";
    }

    return this.createTokensAndGetLoggedUser(user);
  };
  signup = (email: string, password: string, name: string, surname: string) => {
    const users = this.databaseService.getUsers();

    if (users.find((u: User) => u.email === email)) {
      throw "The provided email is already in use";
    }

    const newUser = new User(email, password, name, surname, Roles.user);
    users.push({ ...newUser });

    this.databaseService.updateData(users);

    return this.createTokensAndGetLoggedUser(newUser);
  };
  getLoggedUserByToken = (token: string) => {
    const authUser = jwt.verify(token, this.accessTokenSecret) as LoggedUser;

    return authUser;
  };
  refreshToken = (token: string) => {
    const user = jwt.verify(token, this.refreshTokenSecret) as LoggedUser;
    if (!user || !this.refreshTokens[user.id]) {
      throw "Invalid refresh token";
    }
    const accessToken = jwt.sign({ ...user }, this.accessTokenSecret, {
      expiresIn: "20m",
    });

    user.refreshToken = token;
    user.accessToken = accessToken;

    return user;
  };
  logout = (token: string) => {
    delete this.refreshTokens[token];
  };
  private createTokensAndGetLoggedUser = (user: User) => {
    const accessToken = this.getJwtToken(user, this.accessTokenSecret, "20m");
    const refreshToken = this.getJwtToken(user, this.refreshTokenSecret);

    this.refreshTokens[user.id] = refreshToken;

    return new LoggedUser(user, accessToken, refreshToken);
  };
  private getJwtToken = (user: User, tokenSecret: string, expiresIn?: string) =>
    jwt.sign(
      { ...new LoggedUser(user) },
      tokenSecret,
      expiresIn ? { expiresIn } : undefined
    );
}
