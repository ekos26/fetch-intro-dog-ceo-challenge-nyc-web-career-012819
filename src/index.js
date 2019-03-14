// console.log('%c HI', 'color: firebrick')

document.addEventListener('DOMContentLoaded', function(){
  const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
  const dogSelector = document.getElementById('breed-dropdown');
  const breedUrl = 'https://dog.ceo/api/breeds/list/all'
  let breeds = [];

  console.log(dogSelector);
  let images;
  const dogBreedsUI = document.getElementById('dog-breeds');
  const dogImageDiv = document.getElementById('dog-image-container');

  fetch(imgUrl).then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let images = json.message;
    return images;
  })
  .then(function(images) {
    images.forEach(function(img) {
      dogImageDiv.innerHTML += `
      <img src ="${img}">
      `
    })
  })

  fetch(breedUrl)
    .then(function(response) {
    return response.json();
    })
    .then(function(json) {
    breeds = Object.keys(json.message);
    return breeds;
    })
    .then(renderBreeds)


  function renderBreeds(breeds) {
    dogBreedsUI.innerHTML = '';
    breeds.forEach(function(breed) {
      dogBreedsUI.innerHTML += `
        <li>"${breed}"</li>
        `
    })

  }

    dogBreedsUI.addEventListener('click', function(e) {
      if (e.target.tagName === "LI") {
        e.target.style.color = "purple";
      }
    })

    dogSelector.addEventListener('input', function(e) {
      let filteredBreeds = breeds.filter(function(breed) {
        return breed.startsWith(e.target.value);
      })

      renderBreeds(filteredBreeds);

    })



})
