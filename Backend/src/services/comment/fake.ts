import { FakeDatabaseService } from "../../services/database/fake";
import CommentService from ".";
import { Comment } from "../../models/comment";
import { User } from "../../models/user";

export class FakeCommentService implements CommentService {
  private databaseService = new FakeDatabaseService();

  delete = (id: string) => {
    const users = this.databaseService.getUsers();

    users.map((user: User) => {
      const commentIndex = user.comments.findIndex((c) => c.id === id);
      if (commentIndex !== -1) {
        user.comments.splice(commentIndex, 1);

        this.databaseService.updateData(users);
      }
    });
  };
  save = (userId: string, title: string, body: string, id: string | null) => {
    const users = this.databaseService.getUsers();

    const user = users.find((u: User) => u.id === userId);
    if (!user) {
      throw "The provided user doesn't exist";
    }

    if (id) {
      const comment = user.comments.find((c) => c.id === id);
      if (!comment) {
        throw "The provided comment doesn't exist";
      }
      comment.body = body;
      comment.title = title;

      this.databaseService.updateData(users);

      return comment;
    } else {
      const comment = new Comment(title, body, user.id);
      user.comments.push(comment);

      this.databaseService.updateData(users);

      return comment;
    }
  };
  getAll = () => {
    const comments = this.databaseService.getComments();

    return comments
      .flat()
      .sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  };
  getById = (id: string) => {
    const comments = this.getAll();

    return comments.find((c: Comment) => c.id === id);
  };
  getByUser = (id: string) => {
    const comments = this.getAll();

    return comments
      .filter((c) => c.userId === id)
      .sort((a, b) => (a.created_at > b.created_at ? -1 : 1));
  };
}
