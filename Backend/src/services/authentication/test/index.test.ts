import { User } from "../../../models/user";
import { Roles } from "../../../authorization";
import * as dep from "../../database/fake";
import { FakeAuthenticationService } from "../fake";

const mocked = dep as jest.Mocked<typeof dep>;
const mockedDatabaseService = mocked.FakeDatabaseService;

let users: User[] = [
  {
    id: "id",
    email: "email",
    password: "password",
    name: "name",
    surname: "surname",
    comments: [],
    role: Roles.admin,
  },
];

mockedDatabaseService.prototype.getUsers = jest.fn(() => {
  return users;
});

mockedDatabaseService.prototype.updateData = jest.fn((data: User[]) => {
  users = [...data];
});

describe("FakeAuthentication", () => {
  const sut = new FakeAuthenticationService(mockedDatabaseService.prototype);

  it("should login", () => {
    const loggedUser = sut.login("email", "password");
    expect(loggedUser).toBeDefined();
    expect(loggedUser.id).toBe("id");
    expect(loggedUser.accessToken).toBeDefined();
    expect(loggedUser.refreshToken).toBeDefined();
    expect(loggedUser.role).toBe(Roles.admin);
  });

  it("should throw an erorr when login with invalid credentials", () => {
    expect(() => sut.login("fakeEmail", "password")).toThrow();
  });

  it("should add a record when signup", () => {
    sut.signup("newEmail", "newPassword", "newName", "newSurname");

    const newUser = users.filter((u) => u.email === "newEmail");
    expect(newUser).toBeDefined();
  });

  it("should signup", () => {
    const loggedUser = sut.signup(
      "newEmail2",
      "newPassword",
      "newName",
      "newSurname"
    );
    expect(loggedUser).toBeDefined();
    expect(loggedUser.id).toBeDefined();
    expect(loggedUser.accessToken).toBeDefined();
    expect(loggedUser.refreshToken).toBeDefined();
    expect(loggedUser.role).toBe(Roles.user);
  });

  it("should throw an erorr when signup with existing credentials", () => {
    expect(() => sut.signup("email", "password", "name", "surname")).toThrow();
  });

  it("should getLoggedUserByToken", () => {
    const loggedUser = sut.login("email", "password");

    const user = sut.getLoggedUserByToken(loggedUser.accessToken as string);
    expect(user).toBeDefined();
    expect(user && user.id).toBe(loggedUser.id);
  });

  it("should not getLoggedUserByToken", () => {
    expect(() =>
      sut.getLoggedUserByToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
      )
    ).toThrow();
  });
});
