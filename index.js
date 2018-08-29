const app = document.getElementById('app')
const baseUrl = "http://www.omdbapi.com/"
const urlKey = "apikey=40ce2d2f"
const titleSearch = "?s=" //flag for type of search. This one is for titles
const searchItem = document.querySelector('input')
const joiner = "&" // Bridges different search criteria
const movieInput = document.getElementById('movieSearch')
const fAwesome = document.querySelector('i')
const hero = document.querySelector('.hero')
const heroBody = document.querySelector('.hero-body')

function getData(searchItem) {
  const url = baseUrl + titleSearch + searchItem + joiner + urlKey
  fetch(url)
  .then(response => response.json())
  .then(resJson => resJson.Search.forEach(extractData))
  .catch(err => console.log(err))
}

function extractData({ Title, Year, Poster, Type, imdbID }) {

  if (Type === 'movie') {
    const url = 'https://www.imdb.com/title'+ "/" + imdbID
    const a = makeElementId('a')
    const div = makeElementId('div');
    const h1 = makeElementId('h1')
    const p = makeElementId('p')
    const img = makeElementId('img')

    div.setAttribute('class', "searchResultItem")

    h1.setAttribute('class', "title");
    h1.setAttribute('title', `Movie ${Title}`);
    h1.textContent =  Title
    div.appendChild(h1)

    p.setAttribute('class', "subtitle");
    p.setAttribute('title', "Year");
    p.textContent =  Year
    div.appendChild(p)

    a.setAttribute("target", "_blank")
    a.setAttribute('href', url)
    div.appendChild(a)

    img.setAttribute('src', `${Poster}`);
    img.setAttribute('alt', "Movie Poster Image");
    a.appendChild(img)

    app.appendChild(div)
  }
}

// Utility
function enterCheck(e) {
  if (e.key === "Enter") {
    getData(e.target.value)
    clearValue()
    changeHero()
  }
}

// Reads input field for search term; then calls fetch() for data
function getSearchReq() {
  if(searchItem.value){
    getData(searchItem.value)
  }
}

function displaySearch() {
  movieInput.style.display = 'block'
  fAwesome.style.display = 'none'
}

function changeHero() {
  hero.style.height = '33vh'
  heroBody.style.paddingTop = '7vh'
  console.log('test Change Hero');
  //return
}

// Clears all data from screen after a search.
function clearValue() {
  searchItem.value = ''
  app.innerHTML = ""
  return
}

// Builds .createElements faster
function makeElementId(el) {
    return document.createElement(el)
}

movieInput.addEventListener("keyup", enterCheck)
fAwesome.addEventListener('click', displaySearch)

