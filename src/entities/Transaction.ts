import { Document } from 'mongoose';

export interface ITransaction {
  transactionDate: { type: Date };
  paymentDate?: { type: Date };
  cardNumber: string;
  status: string;
  transactionAmount?: Number;
  paymentAmount?: Number;
  transactionCurrency?: string;
  paymentCurrency?: string;
  cashback?: Number;
  category?: string;
  mcc?: string;
  description?: string;
  bonus?: string;
}

export interface ITransactionDocument extends ITransaction, Document {}
