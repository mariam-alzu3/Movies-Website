//Ttile: https://omdbapi.com/?s=thor&page=1&apikey=e2db2625
//Posters: 

//const URL = `http://www.omdbapi.com/?i=${randomMovie}&apikey=e2db2625`
//     const URL = `http://www.omdbapi.com/?i=tt0156887&apikey=e2db2625`

const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');

//load movies from API
async function loadMovies(){
    let randomMovie = (Math.floor((Math.random() * 1155529) + 1));
    const URL = `https://omdbapi.com/?s=${randomMovie}&page=1&apikey=e2db2625`
    const res = await fetch(`${URL}`);
    const data = await res.json();

    //if(data.Response == "True") displayMovieList(data.Search);
}



// function displayMovieList(movies){
//     searchList.innerHTML = "";
//     for(let idx = 0; idx < movies.length; idx++){
//         let movieListItem = document.createElement('div');
//         movieListItem.dataset.id = movies[idx].imdbID;
//         movieListItem.classList.add('search-list-item');
//         if(movies[idx].Poster != "N/A")
//             moviePoster = movies[idx].Poster;
//         else    
//             moviePoster = "image_not_found.png";

//         movieListItem.innerHTML = `
//         <div class = "search-item-thumbnail">
//             <img src = "${moviePoster}">
//         </div>
//         <div class = "search-item-info">
//             <h3>${movies[idx].Title}</h3>
//             <p>${movies[idx].Year}</p>
//         </div>
//         `;
//         searchList.appendChild(movieListItem);
//     }

//     loadMovieDetails();
// }

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=e2db2625`);
            const movieDetails =  await result.json();
            displayMovieDetails(movieDetails);
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Rating: ${details.imdbRating}</li>
            <li class = "released"> Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}

$("#refresh").click(function (){
    loadMovies();
});


// window.addEventListener('click', (event) => {
//     if(event.target.className != "form-control") {
//         searchList.classList.add('hide-search-list');
//     }
// });