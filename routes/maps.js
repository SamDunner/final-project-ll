"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:id", (req, res) => {
    knex
      .select("*")
      .from("maps")
      .where('id', req.params.id)
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
    })
    .then((results) => {
      console.log("user posted")
    });
  });

  router.put("/:id", (req, res) => {
    knex("maps").where('id', req.params.id)
    .update({
      'title': req.body.title,
      'location': req.body.location,
      'latitude': req.body.latitude,
      'longitude': req.body.longitude,
      'privacy': req.body.privacy,
      'published': req.body.published
    })
    .then((results) => {
      console.log("user updated")
    });
  });

  router.delete("/:id", (req, res) => {
    knex("maps").where('id', req.params.id)
    .del().then((results) => {
      console.log("user deleted")
// Might be issue with deleting maps that have pins
    });
  });


  return router;
}
