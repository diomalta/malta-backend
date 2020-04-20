export default (): { typeDefs: string[]; resolvers: any } => {
  const modules = [
    { dir: 'Users', filename: 'User' },
    // { dir: 'Users', filename: 'User' },
  ];

  const typeDefs = modules.map(
    ({ dir, filename }) => `
      ${require(`./${dir}/${filename}Type`).default}
      ${require(`./${dir}/${filename}Query`).default}
    `,
  );

  let resolvers = {};
  modules.forEach(({ dir, filename }) => {
    const object = require(`./${dir}/${filename}Resolver`).default;
    resolvers = { ...resolvers, ...object };
  });

  return {
    typeDefs,
    resolvers,
  };
};
