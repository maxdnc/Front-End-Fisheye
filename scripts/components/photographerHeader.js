export default function createPhotographerHeader({
  name,
  portrait,
  city,
  country,
  tagline,
}) {
  const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;
  return `
      <div>
        <h2 class="photographer__name">${name}</h2>
        <p class="photographer__location">${city}, ${country}</p>
        <p class="photographer__tagline">${tagline}</p>
      </div>
      <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
      <img src="${picture}" alt="${name}" class="photographer__portrait">
    `;
}
