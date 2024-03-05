export default async function getPhotographe(id) {
  const urlPhotographersData = './data/photographers.json';
  let data;
  try {
    const response = await fetch(urlPhotographersData);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    data = await response.json();
    const photographer = data.photographers.find(
      (photographer) => photographer.id === Number(id)
    );
    data = await photographer;
    console.log('photographe', data);
  } catch (error) {
    console.error('Error:', error.message);
  }
  return data;
}
