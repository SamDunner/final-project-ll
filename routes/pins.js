"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {

    knex
      .select("*")
      .from("pins")
      .where('map_id', req.query.map_id)
      .then((results) => {
        console.log('successful!')
        res.json(results);
    });

  });

  router.get("/:pin_id", (req, res) => {
    knex
      .select("*")
      .from("pins")
      .where('pin_id', req.params.pin_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  router.post("/", (req, res) => {

    console.log(req.body)

    knex("pins").insert({
      'title': req.body.title,
      'description': req.body.description,
      'type': req.body.type,
      'address': req.body.address,
      'date': req.body.date,
      'latitude': req.body.latitude,
      'longitude': req.body.longitude,
      'rating': req.body.rating,
      'map_id': req.body.map_id,
      'author_id': req.body.author_id
    }).returning('*')
    .then((results) => {
      console.log("pin posted")
      res.json(results);
    });
  });

  router.put("/:pin_id", (req, res) => {
    knex("pins").where('pin_id', req.params.pin_id)
    .update({
      'title': req.body.title,
      'description': req.body.description,
      'type': req.body.type,
      'address': req.body.address,
      'date': req.body.date,
      'latitude': req.body.latitude,
      'longitude': req.body.longitude,
      'rating': req.body.rating,
      'map_id': req.body.map_id,
      'author_id': req.body.author_id
    }).returning('*')
    .then((results) => {
      res.json(results);
      console.log("pin updated")
    });
  });

  router.delete("/:pin_id", (req, res) => {
    knex("pins").where('pin_id', req.params.pin_id)
    .del().then((results) => {
      res.json(results)
      console.log("pin deleted")
// Might be issue with deleting maps that have pins
    });
  });


  return router;
}
