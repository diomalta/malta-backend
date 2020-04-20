export interface IEvent {
  _id: string;
  client: string;
  data: Date;
  horaInicio: string;
  horaFim: string;
  convidados: number;
  valorUnitario: number;
  taxaDeslocamento: number;
  status: string;
  corToalhas: string;
  tipoEvento: string;
  indicadoPor: string;
  equipe: any[];
  observacao: string;
  endereco: string;
}

export interface IEventInputDTO {
  client: string;
  data: Date;
  horaInicio: string;
  horaFim: string;
  convidados: number;
  valorUnitario: number;
  taxaDeslocamento: number;
  corToalhas: string;
  tipoEvento: string;
  indicadoPor: string;
  equipe: any[];
  observacao: string;
  endereco: string;
  status: string;
}
