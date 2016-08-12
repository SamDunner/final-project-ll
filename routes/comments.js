"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("comments")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:comment_id", (req, res) => {
    knex
      .select("*")
      .from("comments")
      .where('comment_id', req.params.comment_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  router.post("/", (req, res) => {
    knex("comments").insert({
      'description': req.body.description,
      'rating': req.body.rating,
      'created_at': req.body.created_at,
      'updated_at': req.body.updated_at,
      'map_id': req.params.map_id,
      'user_id': req.params.user_id
    })
    .then((results) => {
      console.log("comment posted")
    });
  });

  router.put("/:comment_id", (req, res) => {
    knex("comments").where('comment_id', req.params.comment_id)
    .update({
      'description': req.body.description,
      'rating': req.body.rating,
      'created_at': req.body.created_at,
      'updated_at': req.body.updated_at,
      'map_id': req.params.map_id,
      'user_id': req.params.user_id
    })
    .then((results) => {
      console.log("comment updated")
    });
  });

  router.delete("/:comment_id", (req, res) => {
    knex("comments").where('comment_id', req.params.comment_id)
    .del().then((results) => {
      console.log("comment deleted")
// Might be issue with deleting maps that have pins
    });
  });


  return router;
}
