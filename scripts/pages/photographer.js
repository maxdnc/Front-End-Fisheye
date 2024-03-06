import getPhotographe from '../utils/getPhotographe.js';
import createPhotographerHeader from '../components/photographerHeader.js';
import getMediaFromPhotographer from '../utils/getMediaFromPhotographe.js';
import createCardPhoto from '../components/CardPhoto.js';

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

// display the media
const mediaContainer = document.querySelector('.photograph_media');

media.map((item) => {
  const cardPhoto = createCardPhoto(item);
  mediaContainer.innerHTML += cardPhoto;
});
