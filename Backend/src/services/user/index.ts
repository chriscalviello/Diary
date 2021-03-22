import { User } from "../../models/user";

interface IUserService {
  delete: (currentUserId: string, id: string) => void;
  save: () => User;
  getAll: () => User[];
  getById: (userId: string) => User;
}

export default IUserService;
