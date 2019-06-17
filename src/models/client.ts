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
    dataNascimento: Date,
    telefone: String,
    celular: String,
    contato: String,
    eventos: {
      type: [],
    },
    quntidadeEventos: {
      type: Number,
      default: 0,
    },
    anotacao: String,
    role: {
      type: String,
      default: 'client',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IClient & mongoose.Document>('Client', Client);
