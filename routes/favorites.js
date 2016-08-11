"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("favorites")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/favorites", (req, res) => {
    knex
      .select("*")
      .from("favorites")
      .where('map_id', req.params.map_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  router.post("/", (req, res) => {
    knex("favorites").insert({
      'user_id': req.body.user_id,
      'map_id': req.body.map_id
    })
    .then((results) => {
      console.log("favorite posted")
    });
  });

  router.delete("/favorites", (req, res) => {
    knex("favorites").where('map_id', req.params.map_id)
    .del().then((results) => {
      console.log("un-favorited map")
    });
  });


  return router;
}
