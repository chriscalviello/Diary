import { User, LoggedUser } from "../../models/user";

interface IAuthenticationService {
  login: (email: string, password: string) => LoggedUser;
  signup: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => string;
}

export default IAuthenticationService;
