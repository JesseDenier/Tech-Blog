// Imports the 'path' module, provides utilities for working with file paths.
const path = require("path");

// Imports the 'express' module, a web application framework.
const express = require("express");

// Imports the 'express-session' module, provides middleware for Express.
const session = require("express-session");

// Creates an instance of 'express-handlebars'.
const exphbs = require("express-handlebars");

// Imports the routes defined in the './controllers' file.
const routes = require("./controllers");

// Imports custom helper functions for handlebars.
const helpers = require("./utils/helpers");

// Imports a custom Sequelize instance.
const sequelize = require("./config/connection");

// Create a new sequelize store using the express-session package.
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Creates an instance of 'express-handlebars' with custom helpers defined above.
const hbs = exphbs.create({});

// Creates an Express application instance, and defines the port number.
const app = express();
const PORT = process.env.PORT || 3001;

// Configures and links a session object with the sequelize store
const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Add express-session and store as Express.js middleware
app.use(session(sess));

// Sets the Express application to use 'handlebars' as the view engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Adds middleware to parse incoming JSON requests and adds them to the req.body object.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Mounts the routes defined in the './controllers' file to the Express application.
app.use(routes);

// Syncs the Sequelize models with the database, and starts the application.
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App listening on http://localhost:${PORT}`)
  );
});
