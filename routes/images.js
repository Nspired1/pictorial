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
router.get("/", async (req, res) => {
  console.log("Get all images");
  try {
    // const images = await Image.find({ user: req.user.id }).sort({ date: -1 });
    const images = await Image.find({}).sort({ date: -1 });

    // note: images is an array of objects, the objects contain a url to image and filenmae of image
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route   POST api/images/
// @desc    Add a new image
// @access  Private

// router.post("/", auth, (req, res) => {
router.post("/", auth, upload.single("image"), async (req, res) => {
  console.log("This is the req FILE in the image ROUTES");
  console.log(req.file);
  try {
    const image = new Image({
      url: req.file.path,
      filename: req.file.filename,
      title: req.body.title,
      description: req.body.description,
    });
    image.user = req.user.id;

    await image.save();

    console.log("This is POST route to add an image");
    console.log("This is the newImage");
    console.log(image);
    res.json(image);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route   PATCH api/images/:id
// @desc    Update an image
// @access  Private
router.patch("/:id", auth, async (req, res) => {
  const { description } = req.body;
  try {
    let image = await Image.findById(req.params.id);

    if (!image) return res.status(404).json({ msg: "Image not found" });

    if (image.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized." });
    }

    updatedImage = await Image.findByIdAndUpdate(req.params.id, {
      $set: description,
    });
    res.json(updatedImage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error.");
  }
});

// @route   DELETE api/images/:id
// @desc    Delete an image
// @access  Private
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const image = await Image.findById(id);

  cloudinary.uploader.destroy(image.filename);

  await Image.findByIdAndDelete(id);
  res.send({ msg: "Image Deleted." });
});

module.exports = router;
