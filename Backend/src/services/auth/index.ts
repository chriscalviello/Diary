import { User } from "../../models/user";

interface IAuthService {
  delete: () => void;
  login: (email: string, password: string) => string;
  signup: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => string;
  get: () => User[];
}

export default IAuthService;
