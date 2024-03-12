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
const lightboxCloseButton = document.querySelector(
  '.close_lightbox_modal_button'
);
lightboxCloseButton.addEventListener('click', () => {
  const lightBox = document.querySelector('#lightbox_modal');
  lightBox.style.display = 'none';
});

// Function to manage the media in the lightbox
async function handleLightboxMedia(dataFromPhotographer) {
  const lightboxLinks = document.querySelectorAll('.link-to-lightBox');
  const lightBox = document.querySelector('#lightbox_modal');

  let currentMediaIndex = 0;

  lightboxLinks.forEach((link) => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();

      lightBox.style.display = 'flex';
      const id = Number(link.id);
      const clickedMedia = dataFromPhotographer.find((item) => item.id === id);
      currentMediaIndex = dataFromPhotographer.indexOf(clickedMedia);

      await displayMediaInLightbox(clickedMedia);
      await displayTitleInLightBox(dataFromPhotographer[currentMediaIndex]);
    });
  });

  // Next and previous buttons
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
    displayTitleInLightBox(nextMedia);
  });

  previousMediaButton.addEventListener('click', () => {
    currentMediaIndex -= 1;
    if (currentMediaIndex < 0) {
      currentMediaIndex = dataFromPhotographer.length - 1; // reset the index
    }
    const previousMedia = dataFromPhotographer[currentMediaIndex];
    displayMediaInLightbox(previousMedia);
    displayTitleInLightBox(previousMedia);
  });
}

export default handleLightboxMedia;
