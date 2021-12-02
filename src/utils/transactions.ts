import { ITransaction } from '@entities/Transaction';

interface IMapper {
  convert: (record: Object) => ITransaction
}
// сделать свитч кейс для определения типа данных
export class TinkoffMapper implements IMapper {
  public convert(record: any): ITransaction {
    const transactionMap: any = {
      'Дата операции': 'transactionDate',
      'Дата платежа': 'paymentDate',
      'Номер карты': 'cardNumber',
      Статус: 'status',
      'Сумма операции': 'transactionAmount',
      'Валюта операции': 'transactionCurrency',
      'Сумма платежа': 'paymentAmount',
      'Валюта платежа': 'paymentCurrency',
      Кэшбэк: 'cashback',
      Категория: 'category',
      MCC: 'mcc',
      Описание: 'description',
      'Бонусы (включая кэшбэк)': 'bonus',
    };
    const castValue = (fieldName: string, value : string): string | Date | number => {
      switch (fieldName) {
        case 'transactionDate':
        case 'paymentDate':
          if (value) {
            return new Date(value);
          }
          return value;
        case 'transactionAmount':
        case 'paymentAmount':
        case 'cashback':
          if (value) {
            return Number.parseFloat(value);
          }
          return value;
        default:
          return value;
      }
    };
    const result: any = {};
    for (const key of Object.keys(record)) {
      if (transactionMap[key]) {
        result[transactionMap[key]] = castValue(transactionMap[key], record[key]);
      }
    }
    return result;
  }
}
