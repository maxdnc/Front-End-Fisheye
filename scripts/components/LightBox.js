import MediaFactory from '../utils/MediaFactory.js';

const currentMedia = document.querySelector('.current-media');

async function createLightBox({ image, video, title, photographerId }) {
  const typeSource = video ? 'video' : 'image';
  const mediaFile = image || video;
  const pictureSource = `assets/Sample Photos/${photographerId}/${mediaFile}`;
  const mediaObject = new MediaFactory(
    typeSource,
    pictureSource,
    title,
    'lightbox__media'
  );
  const displayMedia = mediaObject.createMedia().display();
  currentMedia.innerHTML = displayMedia;
}

export default createLightBox;

const closeLightBox = document.querySelector('.close_lightbox_modal_button');

closeLightBox.addEventListener('click', () => {
  const lightbox = document.querySelector('#lightbox_modal');
  lightbox.style.display = 'none';
});
