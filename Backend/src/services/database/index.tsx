import { Comment, CommentWithUser } from "../../models/comment";
import { User } from "../../models/user";

interface IDatabaseService {
  getComments: () => CommentWithUser[];
  getUsers: () => User[];
  updateData: (data: User[]) => void;
}

export default IDatabaseService;
