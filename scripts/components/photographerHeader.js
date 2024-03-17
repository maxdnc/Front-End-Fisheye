async function createPhotographerHeader({
  name,
  portrait,
  city,
  country,
  tagline,
}) {
  const picture = `assets/Sample Photos/Photographers_ID_Photos/${portrait}`;
  return `
      <div>
        <h1 class="photographer__name">${name}</h1>
        <p class="photographer__location">${city}, ${country}</p>
        <p class="photographer__tagline">${tagline}</p>
      </div>
      <button class="contact_button" aria-label="Contact Me">Contactez-moi</button>
      <img src="${picture}" alt="${name}" class="photographer__portrait">
    `;
}

async function setupContactModal({ name }) {
  const modalContact = document.querySelector('.contact_modal');
  const openButtonContactModal = document.querySelector('.contact_button');
  const closeButtonContactModal = document.querySelector('.close_modal_button');
  const mainContent = document.querySelector('#main-photographer');

  openButtonContactModal.addEventListener('click', () => {
    modalContact.showModal();
    mainContent.setAttribute('aria-hidden', 'true');
    closeButtonContactModal.focus();
  });
  closeButtonContactModal.addEventListener('click', () => {
    modalContact.close();
    mainContent.setAttribute('aria-hidden', 'false');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modalContact.style.display !== 'null') {
      modalContact.close();
      mainContent.setAttribute('aria-hidden', 'false');
    }
  });

  const nameInContact = document.querySelector('.name-in-contact');
  nameInContact.innerHTML = name;
}

// create the header
async function createHeader(photographerDetail) {
  const photographerContainer = document.querySelector('.photograph-header');
  const photographerHeader = await createPhotographerHeader(photographerDetail);
  // display the data
  photographerContainer.innerHTML = photographerHeader;
  // add the event listener after the data is displayed
  await setupContactModal(photographerDetail);
}

export default createHeader;
