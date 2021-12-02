import StatusCodes from 'http-status-codes';
import {
  Request, Response, Router,
} from 'express';
import Busboy from 'busboy';
import csvParse from 'csv-parse/lib/sync';
import iconv from 'iconv-lite';
import TransactionDao from '@daos/Transaction/TransactionDao';
import { TinkoffMapper } from 'src/utils/transactions';
import logger from '@shared/Logger';

const router = Router();
const { OK } = StatusCodes;
const dao = new TransactionDao();

/** ****************************************************************************
 *                      Get All Transactions - "GET /api/transactions/all"
 ***************************************************************************** */

router.get('/all', async (req: Request, res: Response) => {
  const transactions = await dao.getAll();
  res.status(OK).json({ transactions });
});

/** ****************************************************************************
 *                      Post Transactions SCV - "POST /api/transactions"
 ***************************************************************************** */
router.post('/', async (req: Request, res: Response) => {
  const busboy = new Busboy({ headers: req.headers });
  const chunks: Buffer[] = [];
  let resultBuffer: Buffer;
  busboy.on('file', (fieldname, file) => {
    file.on('data', (data) => {
      chunks.push(data);
    });
    file.on('end', () => {
      resultBuffer = Buffer.concat(chunks);
    });
  });
  busboy.on('finish', async () => {
    const csvString = iconv.decode(resultBuffer, 'win1251');
    const r = csvParse(csvString, { delimiter: ';', columns: true });// сделать асинхронной
    const mapper = new TinkoffMapper();
    const converted = r.map(mapper.convert);
    try {
      await dao.addMany(converted);
    } catch (e) {
      logger.err('Error occurred while writing records');
    }
    res.json(converted);
  });
  req.pipe(busboy);
});

export default router;
