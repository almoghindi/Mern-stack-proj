const axios = require("axios");
const HttpError = require("../models/http-error");

const API_KEY = process.env.MAP_API_KEY;

const getCoordsForAddress = async (address) => {
  const response = await axios.get(`
    http://open.mapquestapi.com/geocoding/v1/address?key=${API_KEY}&location=${encodeURIComponent(
    address
  )}
  `);

  const data = response.data;

  if (!data || data.info.statuscode !== 0) {
    const error = HttpError(
      "Could not find location for the specified address.",
      422
    );
    throw error;
  }

  const coordinates = data.results[0].locations[0].latLng;

  return coordinates;
};

module.exports = getCoordsForAddress;
