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

// Create a scheme for projects
const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  name: String,
});


// Create a model for projects
const Project = mongoose.model('Project', projectSchema);

router.post("/", validUser, upload.single('project'), async (req, res) => {

  const project = new Project({
    user: req.user,
    name: req.body.name,

  });
  try {
    await project.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
  // get my photos
  router.get("/", validUser, async (req, res) => {
    // return photos
    try {
      let projects = await Project.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(projects);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

    // get all projects
    router.get("/all", validUser, async (req, res) => {
      try {
        let projects = await Project.find().sort({
          created: -1
        }).populate('user');
        return res.send(projects);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
    });


  module.exports = {
    model: Project,
    routes: router,
  }