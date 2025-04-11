let currentBreed = null

async function fetchBreeds() {
  try {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await response.json();

    if (data.status === "success") {
      const breeds = Object.keys(data.message);
      displayBreeds(breeds);
    } else {
      console.error("Ошибка API при получении списка пород:", data.status);
    }
  } catch (error) {
    console.error('Ошибка получения списка пород:', error);
  }
}

function displayBreeds(breeds) {
  const list = document.querySelector('#breed-list');
  list.innerHTML = '';
  breeds.forEach(breed => {
    const li = document.createElement('li');
    li.textContent = breed;
    li.style.cursor = "pointer";
    li.addEventListener('click', () => fetchBreedPhoto(breed));
    list.appendChild(li);
  });
}

async function fetchBreedPhoto(breed) {
  try {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    if (data.status === "success") {
      currentBreed = breed
      displayBreedPhoto(breed, data.message);
      document.querySelector('#breed-photo').scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error("Ошибка API при получении фотографии:", data.status);
    }
  } catch (error) {
    console.error('Ошибка получения фотографии:', error);
  }
}

function displayBreedPhoto(breed, imageUrl) {
  const detailContent = document.querySelector('#photo-content');
  detailContent.innerHTML = `
    <h3>${breed}</h3>
    <button id="refresh-button">Обновить фотографию</button>
    <br>
    <img src="${imageUrl}" alt="${breed}">
  `;
  document.querySelector("#refresh-button").addEventListener('click', () => {
    fetchBreedPhoto(currentBreed);
  });
}

fetchBreeds();
