const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


//Note : important
//Index route, isme index or baki sbka code controllers k folder me listing.js file me h
router.get("/", wrapAsync(listingController.index));


//New route, user logged in k nhi check krega ye middleware jo middleware.js file me he
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show route
router.get("/:id", wrapAsync(listingController.showListing));

//Create route
router.post(
  "/",
  isLoggedIn,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.createListing),
  
);

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

//Update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
);

//Delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
);

module.exports = router;
