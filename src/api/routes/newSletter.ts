import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import NewSletterService from '../../services/newSletter';
import { INewSletterInputDTO } from '../../interfaces/INewSletter';
import logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/newSletters', route);

  route.post(
    '/store',
    celebrate({
      body: Joi.object({
        email: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling newSletter store endpoint with body: %o ', req.body);

      try {
        const authServiceInstance = Container.get(NewSletterService);
        const { newSletter } = await authServiceInstance.Register(req.body as INewSletterInputDTO);
        return res.json({ newSletter }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
