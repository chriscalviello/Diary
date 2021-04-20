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
}

export default IAuthenticationService;
