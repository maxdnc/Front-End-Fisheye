import heartSvg from '../../assets/icons/heart.js';
import MediaFactory from '../utils/MediaFactory.js';

export default function createCardPhoto({
  image,
  video,
  likes,
  title,
  id: idMedia,
  photographerId,
}) {
  const typeSource = video ? 'video' : 'image';
  const mediaFile = image || video;
  const pictureSource = `assets/Sample_Photos/${photographerId}/${mediaFile}`;
  const mediaObject = new MediaFactory(
    typeSource,
    pictureSource,
    title,
    'card__media'
  );
  const displayMedia = mediaObject.createMedia().display();

  const heartIcon = heartSvg();

  return `
    <div class="card">
    <a id="${idMedia}" class="link-to-lightBox" href="#" aria-label="${title} closeup view">
      ${displayMedia}
      </a>
        <div class="card__info">
          <p class="card__title">${title}</p>
          <div class="card__likes">
            <p class="card__likes-count">${likes}</p>
            <button class="card__likes-button" aria-label="likes">${heartIcon}</button>
      
          </div>
      `;
}
