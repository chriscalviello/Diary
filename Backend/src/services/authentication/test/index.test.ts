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
    role: Roles.user,
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
    expect(loggedUser.email).toBe("email");
    expect(loggedUser.token).toBe("fake-jwt-token|id");
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
    expect(loggedUser.email).toBe("newEmail2");
    expect(loggedUser.token).toBe("fake-jwt-token|" + loggedUser.id);
  });

  it("should throw an erorr when signup with existing credentials", () => {
    expect(() => sut.signup("email", "password", "name", "surname")).toThrow();
  });
});
