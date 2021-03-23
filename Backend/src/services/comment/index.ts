import { Comment } from "../../models/comment";

interface ICommentService {
  delete: (id: string) => void;
  save: (
    userId: string,
    title: string,
    text: string,
    id: string | null
  ) => Comment;
  getAll: () => Comment[];
  getById: (id: string) => Comment | undefined;
  getByUser: (userId: string) => Comment[];
}

export default ICommentService;
