const BASE_URL = "https://webdev.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const movies = [];
const submitMovies = [];

const dataPanel = document.querySelector("#data-panel");
const searchSubmitButton = document.querySelector("#search-submit-button");
const searchInput = document.querySelector("#search-input");
const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function onSearchFormSubmitted(event) {
  event.preventDefault();
  console.log(event);
  console.log(searchInput);

  console.log(searchInput.value);
  let kValue = searchInput.value.trim().toLowerCase();
  console.log(kValue);

  if (!kValue.length) {
    console.log(kValue);
    alert("輸入值不對");
  }
});

// =================(自行練習: 搜尋功能 S)==================== //
// 存取搜尋列輸入的資料
// let keyword = ''
// const keywordData = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
// searchInput.addEventListener('keydown',(event)=>{
//   if( "Backspace" === event.key){
//       console.log(keyword.length)
//       keyword = keyword.slice(0,keyword.length-1)
//       } else {
//         keywordData.forEach(key => {
//           if(key === event.key){
//             keyword += event.key
//           }
//         })
//       }
//   console.log(keyword)
// })

// 點選Submit按鈕，觸發關鍵字比對
// searchSubmitButton.addEventListener('click',(event)=>{
//   event.preventDefault()

//   const selectedMovie = []
//   movies.forEach(movie => {
//     if (movie.title.toLowerCase().includes(keyword.toLowerCase())){
//       selectedMovie.push(movie)
//     }
//     renderMovieList(selectedMovie)
//   })
// })
// =================(自行練習: 搜尋功能 E)==================== //

// 按鈕觸發彈跳視窗
dataPanel.addEventListener("click", (event) => {
  let target = event.target;
  if (target.classList.contains("btn-show-movie")) {
    const id = Number(target.getAttribute("data-set-id")) - 1;
    let text = "";
    text += `    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="movie-modal-title">${
            movies[id].title
          }</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="movie-modal-body">
            <div class="d-flex">
              <img src="${POSTER_URL + movies[id].image}" alt="image">
              <div class="flex-column px-3">
                <h2>release at: ${movies[id].release_date}</h2>
                <p>${movies[id].description}</p>
              </div>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>`;

    document.querySelector("#movie-modal").innerHTML = text;
  } else {
    console.log("others");
  }
});

// 呈現電影列表
function renderMovieList(data) {
  let rawHTML = "";

  data.forEach((item) => {
    rawHTML += `<div class="col-sm-3">
              <div class="mb-2">
              <div class="card">
              <img src="${POSTER_URL}${item.image}" class="card-img-top" alt="poster">
              <div class="card-body">
                <h5 class="card-title">${item.title} </h5>
                <div class="card-footer text-body-secondary">
                  <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-set-id="${item.id}">More</button> 
                  <button class="btn btn-info btn-add-favorite">+</button>
                </div>  
              </div>
              </div>
            </div>
        </div>`;
  });
  dataPanel.innerHTML = rawHTML;
}

axios
  .get(INDEX_URL) // 修改這裡
  .then((response) => {
    movies.push(...response.data.results);
    renderMovieList(movies);
  })
  .catch((err) => console.log(err));
