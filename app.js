/*
    Pexels API Authorization: 
    key-    TiECusK79ak5iEskQxN1QptQYpIBfn7UTpuKvdj7rnEQgb5uvooHibea

    "https://api.pexels.com/v1/curated?per_page=15&page=1"
    "https://api.pexels.com/v1/search?query=nature&per_page=15&page=1"
    
*/

const auth = "TiECusK79ak5iEskQxN1QptQYpIBfn7UTpuKvdj7rnEQgb5uvooHibea";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let fetchLink;
let page = 1;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);
function updateInput(e) {
  searchValue = e.target.value;
}


async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });

  const data = await dataFetch.json();

  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
    <div class="gallery-info">
    <p>${photo.photographer}</p>
    <a target="_blank" href="${photo.src.original}">Download</a>
     </div> 
     <img src=${photo.src.large}></img>`;

    gallery.appendChild(galleryImg);
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink =`https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;

  if (searchValue) {
    fetchLink = `https://api.pexels.com/v1/search?query=${searchValue}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();