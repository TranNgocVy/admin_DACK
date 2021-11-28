const adminRouter = require('./admin')
const bookRouter = require('./books')
const stockRouter = require('./stocks')
const accountRouter = require('./accounts')
const orderRouter = require('./orders')
const receiptRouter = require('./receipts')

function route(app){
  app.use('/',adminRouter);
  app.use('/books',bookRouter);
  app.use('/stocks',stockRouter);
  app.use('/orders',orderRouter);
  app.use('/receipts',receiptRouter);
  app.use('/accounts',accountRouter);

}

module.exports = route;