import { LoggedUser } from "../../models/user";

interface IAuthenticationService {
  login: (email: string, password: string) => LoggedUser;
  signup: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => LoggedUser;
  getUserIdByToken: (token: string) => string;
  refreshToken: (token: string) => LoggedUser;
  logout: (token: string) => void;
}

export default IAuthenticationService;
