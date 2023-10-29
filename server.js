const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const Sequelize = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// Initialize app
const app = express();

// Set up Sequelize with MySQL
const sequelize = new Sequelize('cms_blog_site', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Configure session
const sessionStore = new SequelizeStore({
  db: sequelize,
});
app.use(session({
  secret: 'your-secret-key',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
}));
sessionStore.sync();

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Set up Handlebars view engine
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Set up static folder
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to make user available to all templates
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Body parser middleware
app.use(express.urlencoded({ extended: false }));

// Use routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    title: 'Error',
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
