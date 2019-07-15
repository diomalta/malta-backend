import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';

import DashboardService from '../../services/dashboard';
import logger from '../../loaders/logger';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/dashboards', route);

  route.get(
    '/week',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling event get event in the week endpoint');
      try {
        const dashboardService = Container.get(DashboardService);
        const events = await dashboardService.GetEventWeek();
        return res.json({ events }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/counts',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling event get count for card in the dashboard');
      try {
        const dashboardService = Container.get(DashboardService);
        const counts = await dashboardService.GetCount();
        return res.json({ counts }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
