"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .orderBy('updated_at', 'desc')
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:map_id", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .where('map_id', req.query.map_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  router.post("/", (req, res) => {
    knex("maps").insert({
      'title': req.body.title,
      'location': req.body.location,
      'latitude': req.body.latitude,
      'longitude': req.body.longitude,
      'privacy': req.body.privacy,
      'published': req.body.published
    }).returning('*')
    .then((results) => {
      res.json(results)
      console.log("map posted")
    });
  });

  router.put("/:map_id", (req, res) => {

    console.log(req.body)

    knex("maps").where('map_id', req.params.map_id)
    .update({
      'title': req.body.title,
      'location': req.body.location,
      'latitude': req.body.latitude,
      'longitude': req.body.longitude,
      'privacy': req.body.privacy,
      'published': req.body.published
    }).returning('*')
    .then((results) => {
      res.json(results);
      console.log("map updated")
    });
  });

  router.delete("/:map_id", (req, res) => {
    knex("maps").where('map_id', req.params.map_id)
    .del().then((results) => {
      console.log("map deleted")
// Might be issue with deleting maps that have pins
    });
  });


  return router;
}
