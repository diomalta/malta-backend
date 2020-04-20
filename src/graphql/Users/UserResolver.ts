import { Container } from 'typedi';

import AuthService from '../../services/auth';
import Logger from '../../loaders/logger';

export default {
  Query: {
    users: () => [],
  },
  Mutation: {
    signIn: async (_parent, { email, password }) => {
      const authServiceInstance = Container.get(AuthService);

      Logger.info(`Request: signIn, args: (${email}, ${password})`);
      return authServiceInstance.SignIn(email, password);
    },

    signUp: async (_parent, { name, email, password, username }) => {
      const authServiceInstance = Container.get(AuthService);

      Logger.info(`Request: signUp, args: (${name}, ${email}, ${password}, ${username})`);
      return authServiceInstance.SignUp({ name, email, password, username });
    },
  },
};
