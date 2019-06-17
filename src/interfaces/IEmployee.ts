export interface IEmployee {
  _id: string;
  name: string;
  email: string;
  telefone: string;
  celular: string;
  contato: string;
  cargo: string;
  diaria: number;
  quantidadeEventos: number;
}

export interface IEmployeeInputDTO {
  name: string;
  email: string;
  telefone: string;
  celular: string;
  contato: string;
  cargo: string;
  diaria: number;
}
