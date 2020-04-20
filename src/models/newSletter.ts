import { INewSletter } from '../interfaces/INewSletter';
import * as mongoose from 'mongoose';

const NewSletter = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
    },
    role: {
      type: String,
      default: 'NewSletter',
    },
  },
  { timestamps: true },
);

export default mongoose.model<INewSletter & mongoose.Document>('NewSletter', NewSletter);
