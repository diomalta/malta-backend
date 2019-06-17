import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import EventService from '../../services/event';
import { IEventInputDTO } from '../../interfaces/IEvent';

const route = Router();

export default (app: Router) => {
  app.use('/events', route);

  route.post(
    '/',
    celebrate({
      body: Joi.object({
        client: Joi.string().required(),
        data: Joi.date().required(),
        convidados: Joi.number().required(),
        valorUnitario: Joi.number().required(),
        horaInicio: Joi.string(),
        horaFim: Joi.string(),
        taxaDeslocamento: Joi.number(),
        corToalhas: Joi.string(),
        status: Joi.string().required(),
        tipoEvento: Joi.string(),
        indicadoPor: Joi.string(),
        observacao: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling event store endpoint with body: %o ', req.body);

      try {
        const eventServiceInstance = Container.get(EventService);
        const { event } = await eventServiceInstance.Register(req.body as IEventInputDTO);
        return res.json({ event }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    '/:id',
    celebrate({
      body: Joi.object({
        client: Joi.string().required(),
        data: Joi.date().required(),
        convidados: Joi.number().required(),
        valorUnitario: Joi.number().required(),
        horaInicio: Joi.string(),
        horaFim: Joi.string(),
        taxaDeslocamento: Joi.number(),
        corToalhas: Joi.string(),
        status: Joi.string().required(),
        tipoEvento: Joi.string(),
        indicadoPor: Joi.string(),
        observacao: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling event update endpoint with body: %o ', req.body);

      try {
        const eventServiceInstance = Container.get(EventService);
        const { event } = await eventServiceInstance.Update(req.params.id, req.body as IEventInputDTO);
        return res.json({ event }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get('/all', async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    logger.debug('Calling event get all endpoint');

    try {
      const eventServiceInstance = Container.get(EventService);
      const event = await eventServiceInstance.GetAll();
      return res.json({ event }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/month', async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    logger.debug('Calling event get all endpoint');

    try {
      const eventServiceInstance = Container.get(EventService);
      const event = await eventServiceInstance.GetCurrentMonth();
      return res.json({ event }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const logger = Container.get('logger');
    logger.debug('Calling event get one endpoint');

    try {
      const eventServiceInstance = Container.get(EventService);
      const { event } = await eventServiceInstance.Get();
      return res.json({ event }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });
};
