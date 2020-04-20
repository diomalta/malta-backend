import { IClient } from '../interfaces/IClient';
import * as mongoose from 'mongoose';

const Client = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a full name'],
      index: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    // dataNascimento: {
    //   type: Date,
    //   index: true,
    // },
    telefone: String,
    celular: String,
    contato: String,
    eventos: {
      type: [],
    },
    quantidadeEventos: {
      type: Number,
      default: 0,
    },
    anotacao: {
      type: String,
      default: 'Nenhuma anotação foi feita...',
    },
    role: {
      type: String,
      default: 'client',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IClient & mongoose.Document>('Client', Client);
