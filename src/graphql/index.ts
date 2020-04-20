import { gql } from 'apollo-server-express';

export default (): { typeDefs: any; resolvers: any } => {
  const modules = [
    { dir: 'Users', filename: 'User' },
    // { dir: 'Users', filename: 'User' },
  ];

  const typeDefs = modules.map(
    ({ dir, filename }) =>
      gql`
        ${`
      ${require(`./${dir}/${filename}Type`).default}
      ${require(`./${dir}/${filename}Query`).default}
      ${require(`./${dir}/${filename}Mutation`).default}
    `
          .trim()
          .replace(/\n/, '')}
      `,
  );

  let resolvers = {};
  modules.forEach(({ dir, filename }) => {
    const object = require(`./${dir}/${filename}Resolver`).default;
    resolvers = { ...resolvers, ...object };
  });

  return {
    typeDefs: typeDefs[0],
    resolvers,
  };
};
