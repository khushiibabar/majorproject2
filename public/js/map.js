mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  center: listing.geometry.coordinates,
  // Note :
  // mapbox use kr rhe to pehle Longitude aaayega fir Latitude  starting position [lng, lat].
  zoom: 9, // starting zoom
});

// Create a default Marker and add it to the map.
const marker1 = new mapboxgl.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates)//Listing.geometry.coordinates k cordinates aayenge yha
  .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`))
  .addTo(map);

  db.listings.updateMany(
  { geometry: { $exists: false } }, 
  { $set: { geometry: { type: "Point", coordinates: listing.geometry.coordinates } } } // Example: Delhi coords
)
