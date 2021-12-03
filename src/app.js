const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('express-handlebars')
const routes = require('./routes')
const passport = require('./config/auth/passport')
const session = require("express-session")
const methodOverride = require('method-override')
const middleUserOnl = require("./app/middleware/userOnline")


const app = express();

// view engine setup
app.engine(
  '.hbs',
  handlebars.engine({
    extname :'.hbs',
    helpers: require('./helpers/handlebars')
  })
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');
//use middleware

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//session connect passport config
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize()); 
app.use(passport.session());



app.use(middleUserOnl)

//middleware method
app.use(methodOverride('_method'))



routes(app);





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
