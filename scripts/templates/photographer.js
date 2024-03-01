export default function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;

  const template = `
      <img src="${picture}" alt="Portrait photo de ${name}">
      <h2>${name}</h2>
      <div class="description">
        <p>${city}, ${country}</p>
        <p>${tagline}</p>
        <p>${price}€/jour</p>
      </div>
  `;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.innerHTML = template;
    return article;
  }

  return { name, picture, city, tagline, price, getUserCardDOM };
}
