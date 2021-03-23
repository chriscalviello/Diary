import { User } from "../../models/user";

interface IUserService {
  delete: (currentUserId: string, id: string) => void;
  edit: (email: string, name: string, surname: string, id: string) => User;
  create: (
    email: string,
    password: string,
    name: string,
    surname: string
  ) => User;
  getAll: () => User[];
  getById: (userId: string) => User;
  getByToken: (token: string) => User;
}

export default IUserService;
