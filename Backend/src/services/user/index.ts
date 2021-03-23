import { User } from "../../models/user";
import { Roles } from "../../authorization";

interface IUserService {
  delete: (currentUserId: string, id: string) => void;
  edit: (
    email: string,
    name: string,
    surname: string,
    id: string,
    role: Roles
  ) => User;
  create: (
    email: string,
    password: string,
    name: string,
    surname: string,
    role: Roles
  ) => User;
  getAll: () => User[];
  getById: (userId: string) => User;
  getByToken: (token: string) => User;
}

export default IUserService;
