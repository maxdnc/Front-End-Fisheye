/* eslint-disable no-param-reassign */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
function toggleDropdown(button, dropdown, buttonIcon) {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
  dropdown.classList.toggle('active');
  button.classList.toggle('active');
  buttonIcon.classList.toggle('active');

  if (!expanded) {
    button.focus();
  }
}

export function sortMedia(option, media) {
  // Create a copy of the media array
  const sortedMedia = media;

  // Sort the copy based on the selected option
  sortedMedia.sort((a, b) => {
    if (option.id === 'option-popularity') {
      // Sort by likes in descending order
      return b.likes - a.likes;
    }
    if (option.id === 'option-date') {
      // Sort by date in descending order
      return new Date(b.date) - new Date(a.date);
    }
    if (option.id === 'option-title') {
      // Sort by title in ascending order
      return a.title.localeCompare(b.title);
    }

    // Default sort order
    return 0;
  });

  // Return the sorted array
  return sortedMedia;
}

export function handleOptionClick(
  option,
  button,
  buttonContent,
  buttonIcon,
  dropdown,
  options
) {
  // Update the button's text and aria-expanded attribute
  buttonContent.textContent = option.textContent;
  button.setAttribute('aria-expanded', false);
  button.classList.toggle('active');
  buttonIcon.classList.toggle('active');
  // Hide the dropdown
  dropdown.classList.toggle('active');
  // Update the dropdown's aria-activedescendant attribute
  dropdown.setAttribute('aria-activedescendant', option.id);
  // Hide the selected option and show the other options
  options.forEach((otherOption) => {
    const currentOption = otherOption;
    if (currentOption === option) {
      currentOption.style.display = 'none';
    } else {
      currentOption.style.display = '';
    }
  });
}

export function filterMedia() {
  // Get the button and the dropdown
  const button = document.querySelector('#media-filter-button');
  const dropdown = document.querySelector('#media-filter-options');
  const buttonContent = button.querySelector('#filter-selected');
  const buttonIcon = button.querySelector('.arrow-down');

  // Set the default option to "popularity"
  const defaultOption = dropdown.querySelector('#option-popularity');
  if (defaultOption) {
    defaultOption.style.display = 'none';
  }
  buttonContent.textContent = defaultOption.textContent;
  dropdown.setAttribute('aria-activedescendant', defaultOption.id);

  // Add an event listener to the button to toggle the dropdown
  button.addEventListener('click', () =>
    toggleDropdown(button, dropdown, buttonIcon)
  );
}

export function getSelectedOption(mediaFromPhotographer) {
  const button = document.querySelector('#media-filter-button');
  const dropdown = document.querySelector('#media-filter-options');
  const options = dropdown.querySelectorAll('button');
  const buttonContent = button.querySelector('#filter-selected');
  const buttonIcon = button.querySelector('.arrow-down');

  let selectedOption = null;

  // Add an event listener to each option
  options.forEach((option) => {
    option.addEventListener('click', () => {
      handleOptionClick(
        option,
        button,
        buttonContent,
        buttonIcon,
        dropdown,
        options
      );
      selectedOption = option.textContent;
      sortMedia(selectedOption, mediaFromPhotographer);
    });
  });
}
