import { Service, Inject } from 'typedi';
import MailerService from './mailer';
import { IClient, IClientInputDTO } from '../interfaces/IClient';
import throwError from '../utils/thowError';

@Service()
export default class ClientService {
  constructor(
    @Inject('clientModel') private clientModel,
    private mailer: MailerService,
    @Inject('logger') private logger,
  ) {}

  public async Register(clientInputDTO: IClientInputDTO): Promise<{ client: IClient }> {
    try {
      this.logger.silly('Creating client db record');
      const clientRecord = await this.clientModel.create({ ...clientInputDTO });

      if (!clientRecord) {
        throwError('Client cannot be created');
      }

      this.logger.silly('Sending welcome email');
      // this.mailer.SendWelcomeEmailClient(clientRecord);

      const client = clientRecord.toObject();

      return { client };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Update(_id: String, clientInputDTO: IClientInputDTO): Promise<{ client: IClient }> {
    try {
      this.logger.silly('Updating client db');
      const client = await this.clientModel.findById(_id);

      if (!client) {
        throwError('Client cannot be updated');
      }

      await client.update({ ...clientInputDTO });

      const clientUpdate = client.toObject();

      return { client: clientUpdate };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async Get(id): Promise<[{ client: IClient }]> {
    try {
      this.logger.silly('Get all clients');
      const client = await this.clientModel.findById(id);

      if (!client) {
        throwError('Client not found');
      }

      return client;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public async GetAll(): Promise<[{ client: IClient }]> {
    try {
      this.logger.silly('Get all clients');
      const clients = await this.clientModel
        .find()
        .sort({ createdAt: -1 })
        .limit(500);

      if (clients.length < 1) {
        throwError('Client not found');
      }

      return clients;
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
