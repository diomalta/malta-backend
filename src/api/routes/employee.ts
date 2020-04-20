import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';

import EmployeeService from '../../services/employee';
import { IEmployeeInputDTO } from '../../interfaces/IEmployee';
import middlewares from '../middlewares';
import logger from '../../loaders/logger';

const route = Router();

export default (app: Router) => {
  app.use('/employees', route);

  route.post(
    '/',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        telefone: Joi.string().required(),
        contato: Joi.string(),
        celular: Joi.string(),
        cargo: Joi.string().required(),
        diaria: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling employee store endpoint with body: %o ', req.body);

      try {
        const employeeServiceInstance = Container.get(EmployeeService);
        const { employee } = await employeeServiceInstance.Register(req.body as IEmployeeInputDTO);
        return res.status(201).json({ employee });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.put(
    '/:id',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        telefone: Joi.string().required(),
        contato: Joi.string(),
        celular: Joi.string(),
        cargo: Joi.string().required(),
        diaria: Joi.number().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling employee update endpoint with body: %o ', req.body);

      try {
        const employeeServiceInstance = Container.get(EmployeeService);
        const { employee } = await employeeServiceInstance.Update(req.params.id, req.body as IEmployeeInputDTO);
        return res.json({ employee }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/all',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling employee get all endpoint');

      try {
        const employeeServiceInstance = Container.get(EmployeeService);
        const employees = await employeeServiceInstance.GetAll();
        return res.json({ employees }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.get(
    '/:id',
    middlewares.isAuth,
    middlewares.attachCurrentUser,
    async (req: Request, res: Response, next: NextFunction) => {
      logger.debug('Calling employee get one endpoint');

      try {
        const employeeServiceInstance = Container.get(EmployeeService);
        const employee = await employeeServiceInstance.Get(req.params.id);
        return res.json({ employee }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
