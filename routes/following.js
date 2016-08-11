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

  router.get("/following", (req, res) => {
    knex
      .select("*")
      .from("follows")
      .where('following_user_id', req.params.following_user_id)
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

  router.delete("/following", (req, res) => {
    knex("follows").where('following_user_id', req.params.following_user_id)
    .del().then((results) => {
      console.log("stopped following user")
    });
  });


  return router;
}
