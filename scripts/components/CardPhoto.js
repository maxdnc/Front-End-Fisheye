import heartSvg from '../../assets/icons/heart.js';

export default function createCardPhoto({
  image,
  likes,
  title,
  photographerId,
}) {
  const picture = `assets/Sample Photos/${photographerId}/${image}`;
  const heart = heartSvg();

  return `
    <div class="card">
        <img src="${picture}" alt="${title}" class="card__photo">
        <div class="card__info">
          <p class="card__title">${title}</p>
          <div class="card__likes">
            <p class="card__likes-count">${likes}</p>
            ${heart}
          </div>
      `;
}
