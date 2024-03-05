export default async function getMediaFromPhotographer(photographerId) {
  const urlPhotographersData = './data/photographers.json';
  try {
    const response = await fetch(urlPhotographersData);
    const data = await response.json();
    const media = data.media.filter(
      (media) => media.photographerId === Number(photographerId)
    );

    return media;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
