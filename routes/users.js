"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:user_id", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where('user_id', req.params.user_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  router.post("/", (req, res) => {
    knex("users").insert({
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
      'username': req.body.username,
      'email': req.body.email,
      'password': req.body.password
    })
    .then((results) => {
      console.log("user posted")
    });
  });

  router.put("/:user_id", (req, res) => {
    knex("users").where('user_id', req.params.user_id)
    .update({
      'first_name': req.body.first_name,
      'last_name': req.body.last_name,
      'username': req.body.username,
      'email': req.body.email,
      'password': req.body.password
    })
    .then((results) => {
      console.log("user updated")
    });
  });

  router.delete("/:user_id", (req, res) => {
    knex("users").where('user_id', req.params.user_id)
    .del().then((results) => {
      console.log("user deleted")
    });
  });


  return router;
}
