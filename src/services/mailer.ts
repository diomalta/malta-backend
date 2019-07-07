import { Service, Inject } from 'typedi';
import { IUser } from '../interfaces/IUser';
import { IClientInputDTO } from '../interfaces/IClient';
import throwError from '../utils/thowError';
import Mailer from '../loaders/mailer';

@Service()
export default class MailerService {
  constructor(@Inject('logger') private logger) {}
  public SendWelcomeEmailClient(client: IClientInputDTO) {
    Mailer.to = client.email;
    Mailer.subject = `Buffet Malta - Seja bem-vindo ${client.name}`;
    Mailer.template = 'client/register';
    Mailer.context = {
      name: client.name,
      email: client.email,
      telefone: client.telefone,
      celular: client.celular,
      contato: client.contato,
    };

    Mailer.sendMail();
    return { delivered: 1, status: 'ok' };
  }
  public SendWelcomeEmail(user: Partial<IUser>) {
    /**
     * @TODO Call Mailchimp/Sendgrid or whatever
     */
    return { delivered: 1, status: 'ok' };
  }
  public StartEmailSequence(sequence: string, user: Partial<IUser>) {
    if (!user.email) {
      throwError('No email provided');
    }
    // @TODO Add example of an email sequence implementation
    // Something like
    // 1 - Send first email of the sequence
    // 2 - Save the step of the sequence in database
    // 3 - Schedule job for second email in 1-3 days or whatever
    // Every sequence can have its own behavior so maybe
    // the pattern Chain of Responsibility can help here.
    return { delivered: 1, status: 'ok' };
  }
}
