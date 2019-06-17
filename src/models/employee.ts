import { IEmployee } from '../interfaces/IEmployee';
import * as mongoose from 'mongoose';

const Employee = new mongoose.Schema(
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
    telefone: String,
    celular: String,
    contato: String,
    cargo: String,
    diaria: Number,
    quantidadeEventos: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      default: 'employee',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IEmployee & mongoose.Document>('Employee', Employee);
