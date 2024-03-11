async function createPhotographerHeader({
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

async function setupContactModal() {
  const modal = document.getElementById('contact_modal');
  const openButtonContactModal = document.querySelector('.contact_button');
  const closeButtonContactModal = document.querySelector('.close_modal_button');

  openButtonContactModal.addEventListener('click', () => {
    modal.style.display = 'block';
  });
  closeButtonContactModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
}

// create the header
async function createHeader(photographerDetail) {
  const photographerContainer = document.querySelector('.photograph-header');
  const photographerHeader = await createPhotographerHeader(photographerDetail);
  // display the data
  photographerContainer.innerHTML = photographerHeader;
  // add the event listener after the data is displayed
  setupContactModal();
}

export default createHeader;
