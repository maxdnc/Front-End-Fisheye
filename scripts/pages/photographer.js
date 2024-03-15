import getPhotographe from '../utils/getPhotographe.js';
import createHeader from '../components/photographerHeader.js';
import getMediaFromPhotographer from '../utils/getMediaFromPhotographe.js';
import createCardPhoto from '../components/CardPhoto.js';
import onSubmit from '../utils/getContactFormValue.js';
import handleLightboxMedia from '../components/LightBox.js';
import {
  displayLikesBoxContent,
  displayDayPrice,
  manageLikeCard,
} from '../components/LikeCounter.js';
import {
  filterMedia,
  handleOptionClick,
  sortMedia,
} from '../components/FilterMedia.js';

// get the id from the url
const params = new URLSearchParams(window.location.search);
const idPhotographe = params.get('id');

// get the data from the photographer
const photographerDetail = await getPhotographe(idPhotographe);
// display the media
const mediaContainer = document.querySelector('.photograph_media');

// get the media from the photographer
const mediaFromPhotographer = await getMediaFromPhotographer(idPhotographe);
let currentMedia = mediaFromPhotographer;

// filter media
filterMedia();

const button = document.querySelector('#media-filter-button');
const dropdown = document.querySelector('#media-filter-options');
const options = dropdown.querySelectorAll('button');
const buttonContent = button.querySelector('#filter-selected');
const buttonIcon = button.querySelector('.arrow-down');

let selectedOption = null;

// Add an event listener to each option
options.forEach((option) => {
  option.addEventListener('click', () => {
    handleOptionClick(
      option,
      button,
      buttonContent,
      buttonIcon,
      dropdown,
      options
    );
    selectedOption = option;
    currentMedia = sortMedia(selectedOption, mediaFromPhotographer);
    // Clear the current media
    mediaContainer.innerHTML = '';
    currentMedia.map((item) => {
      const cardPhoto = createCardPhoto(item);
      mediaContainer.innerHTML += cardPhoto;
      return null;
    });
    // Call manageLikeCard after the media cards are added to the DOM
    const likeButtons = document.querySelectorAll('.card__likes-button');
    manageLikeCard(likeButtons);

    handleLightboxMedia(currentMedia);

    // Add the sorted media to the container
  });
});

// create the header
createHeader(photographerDetail);

currentMedia.map((item) => {
  const cardPhoto = createCardPhoto(item);
  mediaContainer.innerHTML += cardPhoto;
  return null;
});

// get data form the form
const contactForm = document.querySelector('#contact-modal-form');
contactForm.addEventListener('submit', onSubmit);

// lightbox
handleLightboxMedia(currentMedia);

// counter likes box
displayLikesBoxContent(currentMedia);
displayDayPrice(photographerDetail);

// card toggle like button
const likeButtons = document.querySelectorAll('.card__likes-button');
manageLikeCard(likeButtons);
