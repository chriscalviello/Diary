import { User, LoggedUser } from "../../models/user";

interface IAuthenticationService {
  delete: () => void;
  login: (email: string, password: string) => LoggedUser;
  signup: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => string;
  get: () => User[];
}

export default IAuthenticationService;
