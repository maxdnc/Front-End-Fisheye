export default function photographerTemplate(data) {
  const { name, portrait, city, country, tagline, price, id } = data;

  const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;

  const template = `
      <a href="photographer.html?id=${id}" class="link" aria-label=${name}>
      <img src="${picture}" alt="Portrait photo de ${name}">
      <h2>${name}</h2> </a>
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

  return { name, picture, city, tagline, price, id, getUserCardDOM };
}
