import { User } from "../../models/user";

interface IUserService {
  delete: () => void;
  save: () => User;
  getAll: () => User[];
  getById: (userId: string) => User;
}

export default IUserService;
