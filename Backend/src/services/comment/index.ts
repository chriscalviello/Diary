import { Comment } from "../../models/comment";

interface ICommentService {
  delete: () => void;
  save: () => Comment;
  getAll: (userId: string) => Comment[];
  getByUser: (userId: string) => Comment[];
}

export default ICommentService;
