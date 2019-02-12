/**
 * Configuration for TMDB
 * To se the latest configuration fetch it from https://api.themoviedb.org/3/configuration?api_key=019e8f375549e0bbd4a4191862ebc88f
 */

require('dotenv').config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

/**
 * Images
 * An image URL looks like this example:
 * http://image.tmdb.org/t/p/w780/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg
 */

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

// Sizes: w300, w780, w1280, original
const BACKDROP_SIZE = 'w1280';

// w92, w154, w185, w342, w500, w780, original
const POSTER_SIZE = 'w500';

export { API_URL, API_KEY, IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE };