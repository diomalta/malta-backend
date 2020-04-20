export default `
  type Mutation {
    signIn(email: String!, password: String!): UserSign,
    signUp(name: String!, email: String!, password: String!, username: String!): UserSign
  }
`;
