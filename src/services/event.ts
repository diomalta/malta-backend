import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { IEvent, IEventInputDTO } from '../interfaces/IEvent';

@Service()
export default class EventService {
  constructor(
    @Inject('eventModel') private eventModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
  ) {}

  public async Register(eventInputDTO: IEventInputDTO): Promise<{ event: IEvent }> {
    try {
      this.logger.silly('Creating event db record');
      const eventRecord = await this.eventModel.create({ ...eventInputDTO });

      if (!eventRecord) {
        throwError('Event cannot be created');
      }

      this.logger.silly('Sending welcome email');
      await this.mailer.SendWelcomeEmail(eventRecord);

      const event = eventRecord.toObject();

      return { event };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(id: String, eventInputDTO: IEventInputDTO): Promise<{ event: IEvent }> {
    try {
      this.logger.silly('Updating event db record');
      const event = await this.eventModel.findById(id);

      if (!event) {
        throwError('Event cannot be updated');
      }

      await event.update({ ...eventInputDTO });
      const eventUpdate = event.toObject();

      return { event: eventUpdate };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Get(id: String): Promise<{ event: IEvent }> {
    try {
      this.logger.silly('Get event db record');
      const event = await this.eventModel.findById(id);

      if (!event) {
        throwError('Event cannot be take');
      }

      return { event };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetCurrentMonth(): Promise<[{ event: IEvent }]> {
    try {
      this.logger.silly('Get event db record');
      const today = new Date();
      today.setDate(today.getDate() + 30);
      var todayString = today.toISOString().split('T')[0];

      const event = await this.eventModel
        .find({
          data: { $gte: new Date(), $lt: new Date(todayString) },
        })
        .populate('client');

      if (event.length < 1) {
        throwError('Event cannot be take');
      }

      return event;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetAll(): Promise<[{ event: IEvent }]> {
    try {
      this.logger.silly('Get event db record');

      const event = await this.eventModel.find();

      if (event.length < 1) {
        throwError('Event cannot be take');
      }

      return event;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
