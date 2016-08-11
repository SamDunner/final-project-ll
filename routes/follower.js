"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("follows")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:follow_id", (req, res) => {
    knex
      .select("*")
      .from("follows")
      .where('follow_id', req.params.follow_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  return router;
}
