import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import ClientService from '../../services/client';
import { IClientInputDTO } from '../../interfaces/IClient';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/clients', route);

  route.post(
    '/',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        telefone: Joi.string().required(),
        celular: Joi.string(),
        contato: Joi.string(),
        dataNascimento: Joi.date(),
        anotacao: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling client store endpoint with body: %o ', req.body);

      try {
        const clientServiceInstance = Container.get(ClientService);
        const { client } = await clientServiceInstance.Register(req.body as IClientInputDTO);
        return res.json({ client }).status(201);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    '/:id',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        contato: Joi.array().required(),
        dataNascimento: Joi.date(),
        anotacao: Joi.string(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling client update endpoint with body: %o ', req.body);

      try {
        const { id } = req.params;
        const clientServiceInstance = Container.get(ClientService);
        const { client } = await clientServiceInstance.Update(id, req.body as IClientInputDTO);
        return res.json({ client }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/all',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling client get all endpoint');

      try {
        const clientServiceInstance = Container.get(ClientService);
        const clients = await clientServiceInstance.GetAll();
        return res.json({ clients }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/:id',
    // middlewares.isAuth,
    // middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling client get one endpoint');

      try {
        const clientServiceInstance = Container.get(ClientService);
        const client = await clientServiceInstance.Get(req.params.id);
        return res.json({ client }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
