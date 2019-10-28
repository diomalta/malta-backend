import * as fs from 'fs';
import * as path from 'path';
import * as csvParser from 'csv-parser';
import { Container, Service, Inject } from 'typedi';

import { IClientInputDTO } from '../interfaces/IClient';
import ClientService from './client';

@Service()
export default class ImportService {
  constructor(
    @Inject('clientModel') private clientModel,
    @Inject('eventModel') private eventModel,
    @Inject('logger') private logger,
  ) {}

  public async importCsvFromOldYears(): Promise<{ message: string }> {
    const clientServiceInstance = Container.get(ClientService);
    try {
      const years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2019'];

      // for (const year of years) {
      //   const results = [];
      //   await this.getDataFile(path.join(__dirname, `../resources/csv/planilha-maltachurrascos-${year}.csv`), results);

      //   for (const row of results) {
      //     if (!this.isBlank(row.client)) {
      //       const email = !this.isBlank(row.email)
      //         ? row.email
      //         : `${row.client
      //             .trim()
      //             .replace(' ', '')
      //             .toLowerCase()}-${row.contact.trim().replace(' ', '')}@notEmail.com`;

      //       let client = await this.clientModel.findOne({ email });
      //       if (!client) {
      //         const [telefone, celular, contato] = !this.isBlank(row.contacts)
      //           ? (row.contacts.split('/').map((s: string) => this.removeBlank(s)) as string[])
      //           : [];
      //         client = (await clientServiceInstance.Register({
      //           name: this.captalize(
      //             row.client
      //               .trim()
      //               .replace(' ', '')
      //               .toLowerCase(),
      //           ),
      //           email,
      //           telefone,
      //           celular,
      //           contato,
      //         } as IClientInputDTO)).client;
      //       }

      //       this.logger.silly('Creating event db record');
      //       const eventRecord = await this.eventModel.create({
      //         client: client._id,
      //         data: !this.isBlank(row.date) ? new Date('20' + this.formatDate(row.date)) : '',
      //         convidados: !this.isBlank(row.count) ? parseInt(row.count.trim(), 10) : 0,
      //         valorUnitario: !this.isBlank(row.value) ? parseFloat(row.value.replace('R$', '').trim()) : 0,
      //         tipoEvento: !this.isBlank(row.type) ? row.type.trim().toLowerCase() : 'Nao informado',
      //         endereco: !this.isBlank(row.adress) ? row.adress.trim() : 'Nao informado',
      //         status: 'Confirmado',
      //       });

      //       if (!eventRecord) {
      //         this.logger.silly(`Row failed insert event\n: ${row}`);
      //       }

      //       client = await this.clientModel.findOne({ email });
      //       await client.update({ quantidadeEventos: client.quantidadeEventos + 1 });
      //     }
      //   }
      // }

      console.warn(`finished`);

      return { message: 'Success' };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  public isBlank(str: string) {
    return !str || /^\s*$/.test(str);
  }

  public removeBlank(str: string) {
    return str.trim().replace(/\ /g, '');
  }

  public captalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public formatDate(date: string) {
    return date
      .replace(/\//g, '-')
      .split('-')
      .reverse()
      .join('-');
  }

  public getDataFile(path: string, results: any) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(path)
        .pipe(csvParser({ separator: ',' }))
        .on('data', async data => results.push(data))
        .on('end', () => {
          resolve();
          this.logger.silly('CSV file successfully processed');
        });
    });
  }
}
