export default async function createPhotographerHeader({
  name,
  portrait,
  city,
  country,
  tagline,
}) {
  const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;
  return `
      <div>
        <h1 class="photographer__name">${name}</h1>
        <p class="photographer__location">${city}, ${country}</p>
        <p class="photographer__tagline">${tagline}</p>
      </div>
      <button class="contact_button">Contactez-moi</button>
      <img src="${picture}" alt="${name}" class="photographer__portrait">
    `;
}
