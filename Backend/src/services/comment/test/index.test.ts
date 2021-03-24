import { Comment, CommentWithUser } from "../../../models/comment";
import { User } from "../../../models/user";
import { Roles } from "../../../authorization";
import * as dep from "../../database/fake";
import { FakeCommentService } from "../fake";

const mocked = dep as jest.Mocked<typeof dep>;
const mockedDatabaseService = mocked.FakeDatabaseService;

const fixUserRelation = (user: User, comments: Comment[]) => {
  return comments.map((c: Comment) => {
    return new CommentWithUser(c, user);
  });
};

let users: User[];

mockedDatabaseService.prototype.getUsers = jest.fn(() => {
  return users;
});

mockedDatabaseService.prototype.getComments = jest.fn(() => {
  const comments = users.map((u: User) => fixUserRelation(u, u.comments));

  return comments.flat();
});

mockedDatabaseService.prototype.updateData = jest.fn((data: User[]) => {
  users = [...data];
});

describe("FakeCommentService", () => {
  const sut = new FakeCommentService(mockedDatabaseService.prototype);

  beforeEach(() => {
    users = [
      {
        id: "1",
        email: "emailadmin",
        password: "passwordadmin",
        name: "nameadmin",
        surname: "surnameadmin",
        comments: [
          {
            id: "3",
            title: "title3",
            body: "body3",
            created_at: new Date(2020, 1, 1),
          },
          {
            id: "5",
            title: "title5",
            body: "body5",
            created_at: new Date(2021, 1, 1),
          },
        ],
        role: Roles.admin,
      },
      {
        id: "2",
        email: "emailuser",
        password: "passworduser",
        name: "nameuser",
        surname: "surnameuser",
        comments: [
          {
            id: "4",
            title: "title3",
            body: "body3",
            created_at: new Date(),
          },
        ],
        role: Roles.user,
      },
    ];
  });

  it("should get user's ordered comments when getByUser", () => {
    const comments = sut.getByUser("1");
    expect(comments).toHaveLength(2);
    expect(comments[0].id).toBe("5");
  });

  it("should throw an error when getByUser", () => {
    expect(() => sut.getByUser("invalidUser")).toThrow();
  });

  it("should getById", () => {
    const comment = sut.getById("3");

    expect(comment).toBeDefined();
    expect(comment && comment.title).toBe("title3");
  });

  it("should return undefined when getById", () => {
    const comment = sut.getById("fakeId");

    expect(comment).toBeUndefined();
  });

  it("should throw an erorr when save with invalid user", () => {
    expect(() => sut.save("fakeUser", "", "", "")).toThrow();
  });

  it("should throw an erorr when save invalid user's comment", () => {
    expect(() => sut.save("1", "", "", "fakeComment")).toThrow();
  });

  it("should update user's comment when save", () => {
    const updatedComment = sut.save("1", "newTitle", "newBody", "3");

    expect(updatedComment).toBeDefined();
    expect(updatedComment.title).toBe("newTitle");
    expect(updatedComment.body).toBe("newBody");

    const storedComment = users[0].comments.find((c) => c.id === "3");
    expect(storedComment).toBeDefined();
    expect(storedComment && storedComment.title).toBe("newTitle");
    expect(storedComment && storedComment.body).toBe("newBody");
  });

  it("should add a new user's comment when save", () => {
    const newComment = sut.save("1", "newTitle", "newBody", null);

    expect(newComment).toBeDefined();
    expect(newComment.title).toBe("newTitle");
    expect(newComment.body).toBe("newBody");

    const storedComment = users[0].comments.find((c) => c.id === newComment.id);
    expect(storedComment).toBeDefined();
    expect(storedComment && storedComment.title).toBe("newTitle");
    expect(storedComment && storedComment.body).toBe("newBody");
  });

  it("should delete", () => {
    sut.delete("3");

    const storedComment = users[0].comments.find((c) => c.id === "3");
    expect(storedComment).toBeUndefined();
    expect(users[0].comments.length).toBe(1);
  });

  it("should do nothing when delete", () => {
    sut.delete("fake");

    expect(users[0].comments.length).toBe(2);
    expect(users[1].comments.length).toBe(1);
  });
});
