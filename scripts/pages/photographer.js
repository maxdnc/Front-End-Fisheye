import getPhotographe from '../utils/getPhotographe.js';
import createPhotographerHeader from '../components/photographerHeader.js';
import getMediaFromPhotographer from '../utils/getMediaFromPhotographe.js';

// get the id from the url
const params = new URLSearchParams(window.location.search);
const idPhotographe = params.get('id');

// get the data from the photographer
const photographerDetail = await getPhotographe(idPhotographe);

// get the media from the photographer
const media = await getMediaFromPhotographer(idPhotographe);
console.log(media);
// create the header
const photographerHeader = createPhotographerHeader(photographerDetail);

// display the data
const photographerContainer = document.querySelector('.photograph-header');
photographerContainer.innerHTML = photographerHeader;
