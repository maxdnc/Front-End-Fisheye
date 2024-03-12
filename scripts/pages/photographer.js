import getPhotographe from '../utils/getPhotographe.js';
import createHeader from '../components/photographerHeader.js';
import getMediaFromPhotographer from '../utils/getMediaFromPhotographe.js';
import createCardPhoto from '../components/CardPhoto.js';
import onSubmit from '../utils/getContactFormValue.js';
import createLightBox from '../components/LightBox.js';
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
let currentIndex = 0;
const linkTolightBox = document.querySelectorAll('.link-to-lightBox');
linkTolightBox.forEach((link) => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const id = Number(link.id);
    const media = mediaFromPhotographer.find((item) => item.id === id);
    currentIndex = mediaFromPhotographer.indexOf(media);
    createLightBox(media);
  });
  // next
});

const nextButton = document.querySelector('.lightbox-button-next');
const previousButton = document.querySelector('.lightbox-button-previous');

nextButton.addEventListener('click', () => {
  currentIndex += 1;
  if (currentIndex >= mediaFromPhotographer.length) {
    currentIndex = 0; // reset the index
  }
  const nextMedia = mediaFromPhotographer[currentIndex];
  createLightBox(nextMedia);
});

previousButton.addEventListener('click', () => {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = mediaFromPhotographer.length - 1; // reset the index
  }
  const previousMedia = mediaFromPhotographer[currentIndex];
  createLightBox(previousMedia);
});
