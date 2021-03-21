import { User } from "../../models/user";

interface IAuthService {
  delete: () => void;
  login: (username: string, password: string) => string;
  signup: (username: string, password: string) => string;
  get: () => User[];
}

export default IAuthService;
