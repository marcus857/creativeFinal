const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();



// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const commentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    photo: {
        type: mongoose.Schema.ObjectId,
        ref: 'Photo'
      },
    comment: String,
    created: {
      type: Date,
      default: Date.now
    },
  });
  
  const Comment = mongoose.model('Comment', commentSchema);

  // upload comment
router.post("/", validUser, upload.single('comment'), async (req, res) => {

    let comment = new Comment({
        comment: req.body.comment,
        user: req.user,
        photo: req.photo,
      });
    try {
      await comment.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get all comments
router.get("/", async (req, res) => {
    try {
        let comments = await Comment.find({
            photo: photo
          });
      return res.send(comments);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  module.exports = {
    model: Comment,
    routes: router,
  }