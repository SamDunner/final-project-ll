"use strict";

const express = require('express');
const router  = express.Router();
const multer  = require('multer')
const upload = multer({ dest: 'public/uploads/' })

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("images")
      .then((results) => {
        res.json(results);
    });
  });

  router.get("/:content_id", (req, res) => {
    knex
      .select("*")
      .from("images")
      .where('pin_id', req.query.pin_id)
      .then((results) => {
        res.json(results);
        console.log(results);
    });
  });

  // router.post("/", (req, res) => {
  //   console.log("arrived", req)

  //   knex("images").insert({
  //     'image_url': req.body.image_url,
  //     'pin_id': req.params.pin_id
  //   })
  //   .then((results) => {
  //     console.log("content posted")
  //   });
  // });

  router.put("/:content_id", (req, res) => {
    knex("images").where('content_id', req.params.pin_id)
    .update({
      'content': req.body.content,
      'image_url': req.body.image_url,
      'pin_id': req.params.pin_id
    })
    .then((results) => {
      console.log("pin updated")
    });
  });

  router.post('/', upload.single('file'), (req, res, next) => {

    knex("images")
      .insert({
        'pin_id': req.session.req.baseUrl.split("/")[6],
        'image_url': req.file.filename
      })
      .then((results) => {
        console.log("image updated", results)
      });
    console.log("testing for where it's going", req.file.path);
    req.file.path
    res.status(201).end();
  });



  router.delete("/:content_id", (req, res) => {
    knex("images").where('content_id', req.params.content_id)
    .del().then((results) => {
      console.log("pin deleted")
// Might be issue with deleting maps that have pins
    });
  });


  return router;
}
