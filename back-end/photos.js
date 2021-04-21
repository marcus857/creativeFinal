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
const projects = require("./projects.js");

const { ObjectId } = require('mongodb');
const User = users.model;
const Project = projects.model;
const validUser = users.valid;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  project: ObjectId,
  id: Number,
  name: String,
  points: Number,
  country: String,
  image: String
});


// Create a model for photos
const Photo = mongoose.model('Photo', photoSchema);

  // upload photo
  router.post("/:id", validUser, upload.single('photo'), async (req, res) => {

    try {

      let project = await Project.findOne({
        _id:req.params.id
    });
  
      let photo = new Photo({
        user: req.user,
        project: req.params.id,
        id: req.body.id,
        name: req.body.name,
        points: req.body.points,
        country: req.body.country,
        image: req.body.image,
      });
        await photo.save();
        res.sendStatus(photo);
      } catch (error) {
        console.log(error);
        return res.sendStatus(500);
      }
    });
  


    // get all photos
    router.get("/:projectID", validUser, async (req, res) => {
      try {

        let project = await Project.findOne({
          _id: req.params.projectID})

          let photos  = await Photo.find({
            project: req.params.projectID
          }).populate("user");

      return res.send(photos);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
    });


  
        // get all photos
        router.delete("/:projectID/:photoID", validUser, async (req, res) => {
          try {
    
            let photo = await Photo.findOne({
              _id: req.params.projectID, _id:req.params.photoID})
              if (!photo){
                res.send(404);
              }
              await photo.delete();
    
          return res.send(200);
        } catch (error) {
          console.log(error);
          return res.sendStatus(500);
        }
        });

  module.exports = {
    model: Photo,
    routes: router,
  }