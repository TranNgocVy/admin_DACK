const adminRouter = require('./admin');
const bookRouter = require('./books');
const stockRouter = require('./stocks');
const accountRouter = require('./accounts');
const orderRouter = require('./orders');
const receiptRouter = require('./receipts');
const apiRouter = require('./api');
const userRouter = require('./users');
const publisherRouter = require('./publishers');

function route(app) {
  app.use('/publishers', publisherRouter);
  app.use('/books', bookRouter);
  app.use('/stocks', stockRouter);
  app.use('/orders', orderRouter);
  app.use('/receipts', receiptRouter);
  app.use('/accounts', accountRouter);
  app.use('/users', userRouter);
  app.use('/api', apiRouter);
  app.use('/', adminRouter);
}

module.exports = route;
