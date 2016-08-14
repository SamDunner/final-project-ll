"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";

const bodyParser     = require("body-parser");
const cookieParser   = require('cookie-parser');
const cors           = require('cors');
const express        = require("express");
// const exphbs         = require('express-handlebars');
const knexConfig     = require("./knexfile");
const knex           = require("knex")(knexConfig[ENV]);
// const knexLogger     = require('knex-logger');
const logger         = require('morgan');
const methodOverride = require('method-override');
const morgan         = require('morgan');
const passport       = require('passport');
//const sass           = require("node-sass-middleware");
const session        = require('express-session');
const LocalStrategy  = require('passport-local');

const multer  = require('multer')
const upload = multer({ dest: 'public/images/' })

// // const config         = require('./config.js'), //config file contains all tokens and other private info
// // const funct          = require('./functions.js'); //funct file contains our helper functions for our Passport and database work

const app               = express();

// Seperated Routes for each Resource
const usersRoutes       = require("./routes/users");
const mapsRoutes        = require("./routes/maps");
const pinsRoutes        = require("./routes/pins");
const pinContentRoutes  = require("./routes/pin_content");
const followingRoutes   = require("./routes/following");
const followerRoutes    = require("./routes/follower")
const favoritesRoutes   = require("./routes/favorites");
const commentsRoutes    = require("./routes/comments");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cors());
app.use(methodOverride('_method'));
// Log knex SQL queries to STDOUT as well
// app.use(knexLogger(knex));
app.use(cookieParser());


app.use(logger('combined'));
app.use(bodyParser.json());
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

// Session-persisted message middleware
app.use(function(req, res, next){
  const err = req.session.error,
      msg = req.session.notice,
      success = req.session.success;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (err) res.locals.error = err;
  if (msg) res.locals.notice = msg;
  if (success) res.locals.success = success;

  next();
});

// // Configure express to use handlebars templates
// var hbs = exphbs.create({
//     defaultLayout: 'main', //we will be creating this layout shortly
// });
// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/styles", sass({
//   src: __dirname + "/styles",
//   dest: __dirname + "/public/styles",
//   debug: true,
//   outputStyle: 'expanded'
// }));

app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/users/:user_id/following", followingRoutes(knex));
app.use("/users/:user_id/followers", followerRoutes(knex));
app.use("/users/:user_id/maps", mapsRoutes(knex));
app.use("/users/:user_id/favorites", favoritesRoutes(knex));
app.use("/users/:user_id/maps/:map_id/comments", commentsRoutes(knex));
app.use("/users/:user_id/maps/:map_id/pins", pinsRoutes(knex));
app.use("/users/:user_id/maps/:map_id/pins/:pin_id/content", pinContentRoutes(knex));



// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/login", (req, res) => {
  knex("users")
  	.select('user_id')
  	.where({username: req.body.username,
  			password: req.body.password})
  	.then((results) => {
  		if(results.length === 1) {
  			res.json(results)
  			console.log("user found!", results )
  		} else {
  			//TO DO: create a response when user cannot be found in DB.
  			console.log("no user!")
  		}
  	})
});


app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  res.redirect("/");
});

app.post('/users/:user_id/favorites/upload', upload.any(), (req, res, next) => {
  res.send(req.files);
})

app.get('/image.png', (req, res) => {
    res.sendfile(path.resolve('./images/image.png'));
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
