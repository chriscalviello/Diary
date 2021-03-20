import CommentService from ".";
import { Comment } from "../../models/comment";

export class FakeCommentService implements CommentService {
  delete = () => {};
  save = () => new Comment("1");
  getAll = () => [];
  getByUser = (id: string) => [];
}
