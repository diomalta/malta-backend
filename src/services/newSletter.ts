import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { INewSletter, INewSletterInputDTO } from '../interfaces/INewSletter';
import throwError from '../utils/thowError';

@Service()
export default class NewSletterService {
  constructor(
    @Inject('newSletterModel') private newSletterModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
  ) {}

  public async Register(newSletterInputDTO: INewSletterInputDTO): Promise<{ newSletter: INewSletter }> {
    try {
      this.logger.silly('Creating newSletter db record');
      const newSletterRecord = await this.newSletterModel.create({ ...newSletterInputDTO });

      if (!newSletterRecord) {
        throwError('NewSletter cannot be created');
      }

      this.logger.silly('Sending welcome email');
      await this.mailer.SendWelcomeEmail(newSletterRecord);

      const newSletter = newSletterRecord.toObject();

      return { newSletter };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
