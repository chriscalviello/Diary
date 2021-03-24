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
  getById: (id: string) => CommentWithUser | undefined;
  getByUser: (userId: string) => CommentWithUser[];
}

export default ICommentService;
