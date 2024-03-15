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

// Get the id from the url
const params = new URLSearchParams(window.location.search);
const idPhotographe = params.get('id');

// Get the data from the photographer
const photographerDetail = await getPhotographe(idPhotographe);

// Display the media
const mediaContainer = document.querySelector('.photograph_media');

// Get the media from the photographer
const mediaFromPhotographer = await getMediaFromPhotographer(idPhotographe);
let currentMedia = mediaFromPhotographer;

// Function to update media display
function updateMediaDisplay(media) {
  // Clear the current media
  mediaContainer.innerHTML = '';

  // Add the sorted media to the container
  media.map((item) => {
    const cardPhoto = createCardPhoto(item);
    mediaContainer.innerHTML += cardPhoto;
    return null;
  });

  // Call manageLikeCard after the media cards are added to the DOM
  const likeButtons = document.querySelectorAll('.card__likes-button');
  manageLikeCard(likeButtons);

  // Update lightbox
  handleLightboxMedia(media);
}

// Filter media
filterMedia();
const popularityOption = document.querySelector('#option-popularity');
// Sort the media by popularity
currentMedia = sortMedia(popularityOption, mediaFromPhotographer);
// Initial media display
updateMediaDisplay(currentMedia);

// Get DOM elements
const button = document.querySelector('#media-filter-button');
const dropdown = document.querySelector('#media-filter-options');
const options = dropdown.querySelectorAll('button');
const buttonContent = button.querySelector('#filter-selected');
const buttonIcon = button.querySelector('.arrow-down');

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
    currentMedia = sortMedia(option, mediaFromPhotographer);
    updateMediaDisplay(currentMedia);
  });
});

// Create the header
createHeader(photographerDetail);

// Initial media display
updateMediaDisplay(currentMedia);

// Get data form the form
const contactForm = document.querySelector('#contact-modal-form');
contactForm.addEventListener('submit', onSubmit);

// Counter likes box
displayLikesBoxContent(currentMedia);
displayDayPrice(photographerDetail);
