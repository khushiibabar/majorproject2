const { response } = require("express");
const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Note : controllers k folder me backend ka data he 

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};


module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings"); // ✅ return yaha lagao
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
let response =  await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send()

  let url = req.file.path;
  let filename = req.file.filename;
  // let {title, description, price, image, location, country} = req.body;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};

  newListing.geometry = response.body.features[0].geometry;

  let saveListing = await newListing.save();
  console.log(saveListing);
  req.flash("success", "New Listing created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings"); // ✅ return yaha lagao
  }

  let originalImageUrl = listing.image.url
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/");

  res.render("listings/edit.ejs", { listing, originalImageUrl});
};

// module.exports.updateListing = async (req, res) => {
//   let { id } = req.params;
//   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

//   if(typeof req.file !== "undefined") {
//    let url = req.file.path;
//   let filename = req.file.filename;
//   listing.image = {url, filename};
//   await listing.save();
//   }

//   req.flash("success", "Listing updated!");
//   res.redirect(`/listings/${id}`);
// };

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // find listing first
  let listing = await Listing.findById(id);

  // update basic fields
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.country = req.body.listing.country;
  listing.location = req.body.listing.location;

  // 🔑 Update geometry if location is changed
  if (req.body.listing.location) {
    const geoData = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    }).send();
    listing.geometry = geoData.body.features[0].geometry;
  }

  // 🔑 If a new image is uploaded
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  await listing.save();

  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
