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
  console.log("This is the REQ object in image ROUTES");
  console.log(req);
  console.log("This is the req FILE in the image ROUTES");
  console.log(req.file);
  try {
    const image = new Image({
      url: req.file.path,
      filename: req.file.filename,
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
router.patch("/:id", (req, res) => {
  res.send("Update an image");
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
