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

  router.get("/:favorite_id", (req, res) => {
    knex
      .select("*")
      .from("favorites")
      .where('favorite_id', req.params.favorite_id)
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

  router.delete("/:favorite_id", (req, res) => {
    knex("favorites").where('favorite_id', req.params.favorite_id)
    .del().then((results) => {
      console.log("un-favorited map")
    });
  });


  return router;
}
