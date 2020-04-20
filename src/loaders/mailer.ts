import * as nodemailer from 'nodemailer';
import * as htmlToText from 'html-to-text';
import * as hbs from 'handlebars';
import * as path from 'path';
import * as fs from 'fs';

import config from '../config';
import logger from './logger';

class Mail {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string,
    public template?: string,
    public context?: object,
  ) {}

  sendMail() {
    let hbsTemplate: string;
    if (this.template) {
      logger.silly('Creating template with hbs');
      const file = fs.readFileSync(path.join(config.mailer.templatesPath, `${this.template}.hbs`), 'utf8');
      logger.debug('Object of options mail: \n%o ', this.context);
      hbsTemplate = hbs.compile(file)(this.context);
    }

    let mailOptions = {
      from: config.mailer.user,
      to: this.to,
      subject: this.subject,
      html: hbsTemplate || this.message,
      text: htmlToText.fromString(hbsTemplate || this.message).trim(),
    };

    const transporter = nodemailer.createTransport({
      host: config.mailer.host,
      port: config.mailer.port,
      auth: {
        user: config.mailer.user,
        pass: config.mailer.pass,
      },
    });

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) return error;
      return 'E-mail enviado com sucesso!';
    });
  }
}

export default new Mail();
