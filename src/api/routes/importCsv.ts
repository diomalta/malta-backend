import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ImportService from '../../services/importCsv';
import logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/imports', route);

  route.get('/old-events', async (req: Request, res: Response, next: NextFunction) => {
    logger.debug('Calling import csv from events');

    try {
      const importServiceInstance = Container.get(ImportService);
      const { message } = await importServiceInstance.importCsvFromOldYears();
      return res.status(201).json({ message });
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
