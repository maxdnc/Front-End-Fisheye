import MediaFactory from '../utils/MediaFactory.js';

const lightboxMediaContainer = document.querySelector('.current-media');

// Function to create and display media in the lightbox
async function displayMediaInLightbox({ image, video, title, photographerId }) {
  const mediaType = video ? 'video' : 'image';
  const mediaFileName = image || video;
  const mediaFilePath = `assets/Sample Photos/${photographerId}/${mediaFileName}`;
  const mediaObject = new MediaFactory(
    mediaType,
    mediaFilePath,
    title,
    'lightbox__media'
  );
  const mediaHTML = mediaObject.createMedia().display();
  lightboxMediaContainer.innerHTML = mediaHTML;
}

// Close the lightbox
const lightboxCloseButton = document.querySelector(
  '.close_lightbox_modal_button'
);
lightboxCloseButton.addEventListener('click', () => {
  const lightbox = document.querySelector('#lightbox_modal');
  lightbox.style.display = 'none';
});

// Function to manage the media in the lightbox
function handleLightboxMedia(dataFromPhotographer) {
  let currentMediaIndex = 0;
  const lightboxLinks = document.querySelectorAll('.link-to-lightBox');
  lightboxLinks.forEach((link) => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const id = Number(link.id);
      const clickedMedia = dataFromPhotographer.find((item) => item.id === id);
      currentMediaIndex = dataFromPhotographer.indexOf(clickedMedia);
      displayMediaInLightbox(clickedMedia);
    });
  });

  const nextMediaButton = document.querySelector('.lightbox-button-next');
  const previousMediaButton = document.querySelector(
    '.lightbox-button-previous'
  );

  nextMediaButton.addEventListener('click', () => {
    currentMediaIndex += 1;
    if (currentMediaIndex >= dataFromPhotographer.length) {
      currentMediaIndex = 0; // reset the index
    }
    const nextMedia = dataFromPhotographer[currentMediaIndex];
    displayMediaInLightbox(nextMedia);
  });

  previousMediaButton.addEventListener('click', () => {
    currentMediaIndex -= 1;
    if (currentMediaIndex < 0) {
      currentMediaIndex = dataFromPhotographer.length - 1; // reset the index
    }
    const previousMedia = dataFromPhotographer[currentMediaIndex];
    displayMediaInLightbox(previousMedia);
  });
}

export default handleLightboxMedia;
