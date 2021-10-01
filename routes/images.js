const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const Image = require("../models/Image");
const multer = require("multer");
const { storage, cloudinary } = require("../cloudinary");
const upload = multer({ storage });

// @route   GET api/images
// @desc    Get all users images
// @access  Private
router.get("/", auth, async (req, res) => {
  console.log("Get all images");
  try {
    const images = await Image.find({ user: req.user.id }).sort({ date: -1 });
    //might need to be sendFile
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route   POST api/images/
// @desc    Add a new image
// @access  Private
router.post("/", auth, (req, res) => {
  try {
    const newImage = new Image({
      user: req.user.id,
    });
    console.log("Add an image");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route   PATCH api/images/:id
// @desc    Update an image
// @access  Private
router.patch("/:id", (req, res) => {
  res.send("Update an image");
});

// @route   DELETE api/images/:id
// @desc    Delete an image
// @access  Private
router.delete("/:id", (req, res) => {
  res.send("Delete an image");
});

module.exports = router;
