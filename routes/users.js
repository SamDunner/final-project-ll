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

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("users")
      .where('id', params.id)
      .then((results) => {
        res.json(results);
        console.log("tests");
    });
  });

  return router;
}
