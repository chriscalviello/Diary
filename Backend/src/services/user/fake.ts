import UserService from ".";
import { User } from "../../models/user";

export class FakeUserService implements UserService {
  delete = () => {};
  save = () => new User("1");
  getAll = () => [];
  getById = (id: string) => new User("1");
}
