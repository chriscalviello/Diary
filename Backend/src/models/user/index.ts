export class User {
  email: string;
  name: string;
  password: string;
  surname: string;

  constructor(
    email: string,
    password: string,
    name: string = "",
    surname: string = ""
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.surname = surname;
  }
}
