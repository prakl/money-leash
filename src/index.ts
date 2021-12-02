import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

const mongoose = require('mongoose');

// eslint-disable-next-line consistent-return
mongoose.connect('mongodb://localhost:27017/moneyleash', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (err: Error) => {
  if (err) return logger.info(err);
  // Start the server
  const port = Number(process.env.PORT || 3000);
  app.listen(port, () => {
    logger.info(`Express server started on port: ${port}`);
  });
});
