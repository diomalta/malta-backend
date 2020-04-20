export default `
  type User {
    _id: String
    name: String
    username: String
    email: String
    password: String
  }

  type UserSign {
    user: User!
    token: String!
  }

  type IUserInputSignIn {
    email: String!
    password: String!
  }

  type IUserInputSignUp {
    name: String!
    email: String!
    password: String!
    username: String!
  }
`;
