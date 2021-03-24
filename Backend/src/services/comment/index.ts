import { Comment, CommentWithUser } from "../../models/comment";

interface ICommentService {
  delete: (id: string) => void;
  save: (
    userId: string,
    title: string,
    text: string,
    id: string | null
  ) => Comment;
  getAll: () => CommentWithUser[];
  getById: (id: string) => Comment | undefined;
  getByUser: (userId: string) => Comment[];
}

export default ICommentService;
