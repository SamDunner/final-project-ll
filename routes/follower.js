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

  router.get("/followers", (req, res) => {
    knex
      .select("*")
      .from("follows")
      .where('follower_user_id', req.params.follower_user_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  router.post("/", (req, res) => {
    knex("follows").insert({
      'following_user_id': req.body.following_user_id,
      'follower_user_id': req.body.follower_user_id
    })
    .then((results) => {
      console.log("follow posted")
    });
  });

  return router;
}
