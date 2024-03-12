async function displayLikesBoxContent(mediaFromPhotographer) {
  let totalLikes = 0;
  await mediaFromPhotographer.forEach((media) => {
    totalLikes += media.likes;
  });
  const likesBox = document.querySelector('.like-counter');
  likesBox.textContent = totalLikes;
}

function displayDayPrice({ price }) {
  const DailyPrice = document.querySelector('.day-price');
  DailyPrice.textContent = price;
}
function manageLikeCard(likeButtons) {
  likeButtons.forEach((button) => {
    const likeCounterCard = button.previousElementSibling;
    const likesBox = document.querySelector('.like-counter');

    button.addEventListener('click', () => {
      let likes = parseInt(likeCounterCard.textContent, 10);
      let totalLikes = parseInt(likesBox.textContent, 10);

      if (button.classList.contains('liked')) {
        button.classList.remove('liked');
        likes -= 1;
        totalLikes -= 1;
        button.setAttribute('aria-label', 'Like');
      } else {
        button.classList.add('liked');
        likes += 1;
        totalLikes += 1;
        button.setAttribute('aria-label', 'Unlike');
      }
      likeCounterCard.textContent = likes;
      likesBox.textContent = totalLikes;
    });
  });
}

export { displayLikesBoxContent, displayDayPrice, manageLikeCard };
