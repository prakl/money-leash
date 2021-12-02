import { ITransaction } from '@entities/Transaction';
import TransactionMongoose from '@daos/Transaction/TransactionMongoose';

export interface ITransactionDao {
  getOne: (id: string) => Promise<ITransaction | null>;
  getAll: () => Promise<ITransaction[]>;
  add: (transaction: ITransaction) => Promise<ITransaction>;
  addMany: (transactions: ITransaction[]) => Promise<ITransaction[] | null>
  update: (user: ITransaction) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

class TransactionDao implements ITransactionDao {
  public getOne(id: string): Promise<ITransaction | null> {
    // TODO
    return Promise.resolve(null);
  }

  public async getAll(): Promise<ITransaction[]> {
    return TransactionMongoose.find({});
  }

  public async add(transaction: ITransaction): Promise<ITransaction> {
    return TransactionMongoose.create(transaction);
  }

  public async update(transaction: ITransaction): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  public async delete(id: string): Promise<void> {
    // TODO
    return Promise.resolve(undefined);
  }

  public addMany(transactions: ITransaction[]): Promise<ITransaction[] | null> {
    return TransactionMongoose.insertMany(transactions, { ordered: false });
  }
}

export default TransactionDao;
