export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  surname: string;

  constructor(
    email: string,
    password: string,
    name: string,
    surname: string,
    id: string = ""
  ) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.surname = surname;
    this.id = id;
  }
}
