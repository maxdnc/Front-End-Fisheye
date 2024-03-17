import MediaFactory from '../utils/MediaFactory.js';

const lightboxMediaContainer = document.querySelector('.current-media');
const lightboxCloseButton = document.querySelector(
  '.close_lightbox_modal_button'
);
const mainContent = document.querySelector('#main-photographer');
const dialogLightBox = document.querySelector('.lightbox-modal-content');

// Function to create and display media in the lightbox
async function displayMediaInLightbox({ image, video, title, photographerId }) {
  const mediaType = video ? 'video' : 'image';
  const mediaFileName = image || video;
  const mediaFilePath = `assets/Sample_Photos/${photographerId}/${mediaFileName}`;
  const mediaObject = new MediaFactory(
    mediaType,
    mediaFilePath,
    title,
    'lightbox__media'
  );
  const mediaHTML = mediaObject.createMedia().display();
  lightboxMediaContainer.innerHTML = mediaHTML;
  if (mediaType === 'video') {
    // eslint-disable-next-line operator-linebreak
    const mediaElement =
      lightboxMediaContainer.querySelector('.lightbox__media');
    mediaElement.setAttribute('controls', true);
    mediaElement.setAttribute('loop', true);
    mediaElement.setAttribute('autoplay', true);
  }
}

async function displayTitleInLightBox({ title }) {
  const titleLightBox = document.querySelector('.lightbox_title');
  titleLightBox.textContent = title;
}

// Close the lightbox

lightboxCloseButton.addEventListener('click', () => {
  dialogLightBox.close();
  mainContent.setAttribute('aria-hidden', 'false');
});

// Function to manage the media in the lightbox
async function handleLightboxMedia(dataFromPhotographer) {
  const lightboxLinks = document.querySelectorAll('.link-to-lightBox');

  let currentMediaIndex = 0;

  lightboxLinks.forEach((link) => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();

      dialogLightBox.showModal();

      mainContent.setAttribute('aria-hidden', 'true');
      lightboxCloseButton.focus();

      const id = Number(link.id);
      const clickedMedia = dataFromPhotographer.find((item) => item.id === id);
      currentMediaIndex = dataFromPhotographer.indexOf(clickedMedia);

      await displayMediaInLightbox(clickedMedia);
      await displayTitleInLightBox(dataFromPhotographer[currentMediaIndex]);
    });
  });

  // close the lightbox with the escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dialogLightBox.style.display === 'block') {
      dialogLightBox.close();
      mainContent.setAttribute('aria-hidden', 'false');
    }
  });

  // Next and previous buttons
  const nextMediaButton = document.querySelector('.lightbox-button-next');
  const previousMediaButton = document.querySelector(
    '.lightbox-button-previous'
  );

  function displayNextMedia() {
    currentMediaIndex += 1;
    if (currentMediaIndex >= dataFromPhotographer.length) {
      currentMediaIndex = 0; // reset the index
    }
    const nextMedia = dataFromPhotographer[currentMediaIndex];
    displayMediaInLightbox(nextMedia);
    displayTitleInLightBox(nextMedia);
  }

  function displayPreviousMedia() {
    currentMediaIndex -= 1;
    if (currentMediaIndex < 0) {
      currentMediaIndex = dataFromPhotographer.length - 1; // reset the index
    }
    const previousMedia = dataFromPhotographer[currentMediaIndex];
    displayMediaInLightbox(previousMedia);
    displayTitleInLightBox(previousMedia);
  }

  nextMediaButton.addEventListener('click', displayNextMedia);
  previousMediaButton.addEventListener('click', displayPreviousMedia);

  // Next and previous buttons with keyboard

  window.addEventListener('keydown', (e) => {
    console.log(e.key);
    if (e.key === 'ArrowRight' && dialogLightBox.style.display !== 'null') {
      displayNextMedia();
    }
    if (e.key === 'ArrowLeft' && dialogLightBox.style.display !== 'null') {
      displayPreviousMedia();
    }
  });
}

export default handleLightboxMedia;
