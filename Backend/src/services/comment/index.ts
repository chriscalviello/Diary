import { Comment } from "../../models/comment";

interface ICommentService {
  delete: () => void;
  save: (
    userId: string,
    title: string,
    text: string,
    id: string | null
  ) => Comment;
  getAll: (userId: string) => Comment[];
  getByUser: (userId: string) => Comment[];
}

export default ICommentService;
