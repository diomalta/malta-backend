export interface IClient {
  _id: string;
  name: string;
  email: string;
  dataNascimento: Date;
  telefone: string;
  celular: string;
  contato: string;
  eventos: any[];
  quantidadeEventos: number;
  anotacao: string;
}

export interface IClientInputDTO {
  name: string;
  email: string;
  dataNascimento: Date;
  anotacao: string;
  telefone: string;
  celular: string;
  contato: string;
}
