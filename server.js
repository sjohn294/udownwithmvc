const express = require('express');
const path = require('path');
const session = require('express-session');
const sequelize = require('./config/connection.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const routes = require("./controllers");

// const helpers = require('./utils/helpers');

// Initialize app
const app = express();
const port = process.env.PORT || 3000;
const hbs = exphbs.create();

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');



// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));




// Start server

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log('Now listening'));
});
