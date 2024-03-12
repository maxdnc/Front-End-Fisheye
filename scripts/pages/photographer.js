import getPhotographe from '../utils/getPhotographe.js';
import createHeader from '../components/photographerHeader.js';
import getMediaFromPhotographer from '../utils/getMediaFromPhotographe.js';
import createCardPhoto from '../components/CardPhoto.js';
import onSubmit from '../utils/getContactFormValue.js';
import handleLightboxMedia from '../components/LightBox.js';
// get the id from the url
const params = new URLSearchParams(window.location.search);
const idPhotographe = params.get('id');

// get the data from the photographer
const photographerDetail = await getPhotographe(idPhotographe);
console.log(photographerDetail);

// get the media from the photographer
const mediaFromPhotographer = await getMediaFromPhotographer(idPhotographe);
console.log(mediaFromPhotographer);

// create the header
createHeader(photographerDetail);

// display the media
const mediaContainer = document.querySelector('.photograph_media');

mediaFromPhotographer.map((item) => {
  const cardPhoto = createCardPhoto(item);
  mediaContainer.innerHTML += cardPhoto;
  return null;
});

// get data form the form
const contactForm = document.querySelector('#contact-modal-form');
contactForm.addEventListener('submit', onSubmit);

// lightbox
handleLightboxMedia(mediaFromPhotographer);
