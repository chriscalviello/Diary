import { Comment } from "../../models/comment";

interface ICommentService {
  delete: () => void;
  save: () => Comment;
  getAll: () => Comment[];
  getByUser: (userId: string) => Comment[];
}

export default ICommentService;
