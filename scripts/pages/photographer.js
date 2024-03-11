import getPhotographe from '../utils/getPhotographe.js';
import createHeader from '../components/photographerHeader.js';
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
createHeader(photographerDetail);

// display the media
const mediaContainer = document.querySelector('.photograph_media');

media.map((item) => {
  const cardPhoto = createCardPhoto(item);
  mediaContainer.innerHTML += cardPhoto;
  return null;
});
