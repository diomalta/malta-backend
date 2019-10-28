export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  salt: string;
  username: string;
}

export interface IUserInputDTO {
  name: string;
  email: string;
  password: string;
  username: string;
}
