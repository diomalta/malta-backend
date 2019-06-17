import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userModel = {
    name: 'userModel',
    model: require('../models/user').default,
  };

  const clientModel = {
    name: 'clientModel',
    model: require('../models/client').default,
  };

  const employeeModel = {
    name: 'employeeModel',
    model: require('../models/employee').default,
  };

  const eventModel = {
    name: 'eventModel',
    model: require('../models/event').default,
  };

  const newSletterModel = {
    name: 'newSletterModel',
    model: require('../models/newSletter').default,
  };

  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [userModel, clientModel, employeeModel, eventModel, newSletterModel],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
