import { LoggedUser } from "../../models/user";

interface IAuthenticationService {
  login: (email: string, password: string) => LoggedUser;
  signup: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => LoggedUser;
  getLoggedUserByToken: (token: string) => LoggedUser;
  refreshToken: (token: string) => LoggedUser;
  logout: (token: string) => void;
}

export default IAuthenticationService;
