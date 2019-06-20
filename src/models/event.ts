import { IEvent } from '../interfaces/IEvent';
import * as mongoose from 'mongoose';

const Event = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      require: true,
    },
    data: Date,
    horaInicio: String,
    horaFim: String,
    status: String,
    convidados: Number,
    valorUnitario: Number,
    taxaDeslocamento: {
      type: Number,
      default: 0,
    },
    corToalhas: String,
    tipoEvento: String,
    indicadoPor: String,
    equipe: [],
    observacao: String,
    role: {
      type: String,
      default: 'Event',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IEvent & mongoose.Document>('Event', Event);
