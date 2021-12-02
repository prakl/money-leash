import {
  model, Schema,
} from 'mongoose';
import { ITransactionDocument } from '@entities/Transaction';

const TransactionSchema: Schema = new Schema({
  transactionDate: {
    type: Date,
    required: true,
    unique: true,
  },
  paymentDate: {
    type: Date,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  transactionAmount: {
    type: Number,
  },
  paymentAmount: {
    type: Number,
  },
  transactionCurrency: {
    type: String,
  },
  paymentCurrency: {
    type: String,
  },
  cashback: {
    type: Number,
  },
  category: {
    type: String,
  },
  mcc: {
    type: String,
  },
  description: {
    type: String,
  },
  bonus: {
    type: String,
  },
});

export default model<ITransactionDocument>('Transaction', TransactionSchema);
