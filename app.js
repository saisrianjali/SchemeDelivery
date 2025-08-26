const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const chatRouter = require('./routes/chatbot');
const filterRouter = require('./routes/filters');
const dashboardRouter = require('./routes/dashboard');
const searchRouter = require('./routes/search');
const { router: slugRouter } = require('./routes/slug');
const app = express();

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key', // Replace with a secure key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Use `true` if using HTTPS
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup',signupRouter);
app.use('/chat', chatRouter);
app.use('/filters',filterRouter);
app.use('/dashboard',dashboardRouter);
app.use('/api',searchRouter);
app.use('/slug',slugRouter);
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
