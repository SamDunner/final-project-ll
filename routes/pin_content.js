"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("pin_content")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:content_id", (req, res) => {
    knex
      .select("*")
      .from("pin_content")
      .where('content_id', req.params.content_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  router.post("/", (req, res) => {
    knex("pin_content").insert({
      'content': req.body.content,
      'image_url': req.body.image_url,
      'pin_id': req.params.pin_id
    })
    .then((results) => {
      console.log("content posted")
    });
  });

  router.put("/:content_id", (req, res) => {
    knex("pin_content").where('content_id', req.params.pin_id)
    .update({
      'content': req.body.content,
      'image_url': req.body.image_url,
      'pin_id': req.params.pin_id
    })
    .then((results) => {
      console.log("pin updated")
    });
  });

  router.delete("/:content_id", (req, res) => {
    knex("pin_content").where('content_id', req.params.content_id)
    .del().then((results) => {
      console.log("pin deleted")
// Might be issue with deleting maps that have pins
    });
  });


  return router;
}
