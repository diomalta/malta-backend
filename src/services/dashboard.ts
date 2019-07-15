import { Service, Inject } from 'typedi';

import { IClient, IClientInputDTO } from '../interfaces/IClient';
import { IEvent, IEventInputDTO } from '../interfaces/IEvent';
import throwError from '../utils/thowError';
import newSletter from '../api/routes/newSletter';
import employee from '../models/employee';

@Service()
export default class DashboardService {
  constructor(
    @Inject('clientModel') private clientModel,
    @Inject('eventModel') private eventModel,
    @Inject('employeeModel') private employeeModel,
    @Inject('newSletterModel') private newSletterModel,
    @Inject('logger') private logger,
  ) {}

  public async GetEventWeek(): Promise<[{ events: IEvent }]> {
    try {
      this.logger.silly('Get event db record');
      const today = new Date();
      today.setDate(today.getDate() + 7);
      var todayString = today.toISOString().split('T')[0];

      const events = await this.eventModel
        .find({
          data: { $gte: new Date(), $lte: new Date(todayString) },
        })
        .populate('client');

      if (events.length < 1) {
        throwError('Events cannot be take');
      }

      return events;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetCount(): Promise<{ events: number; clients: number; newSletters: number; employees: number }> {
    try {
      this.logger.silly('Get event db record');
      const events = await this.eventModel.find({}).count();
      const clients = await this.clientModel.find({}).count();
      const employees = await this.employeeModel.find({}).count();
      const newSletters = await this.newSletterModel.find({}).count();

      return { events, clients, employees, newSletters };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
