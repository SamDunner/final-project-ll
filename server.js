"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cors        = require('cors');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const mapsRoutes  = require("./routes/maps");
const pinsRoutes  = require("./routes/pins");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cors());
app.use(methodOverride('_method'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.use(cookieParser());
app.use(methodOverride('_method'));


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));

// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/users/:user_id/maps", mapsRoutes(knex));
app.use("/users/:user_id/maps/:map_id/pins", pinsRoutes(knex));

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
  			res.cookie("user_id", results[0].user_id);
  			console.log("user found!");
        res.redirct("/");
  		} else {
  			//TO DO: create a response when user cannot be found in DB.
  			console.log("no user!")
  		}
  	})
});


app.post("/logout", (req, res) => {
  res.clearCookie("user_id");
  //res.redirect("/login");
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
