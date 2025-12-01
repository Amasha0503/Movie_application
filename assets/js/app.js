console.log("js loaded");

const apikey = "40911ae8"; 

async function apiCall(title_name) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title_name)}&apikey=${apikey}`);
        const data = await response.json();

        if (data.Response === "True") {
            setDetails(data);
            return true;
        } else {
            showError("Movie not found!");
            return false;
        }
    } catch (error) {
        console.error("API Error:", error);
        showError("Failed to load movie!");
        return false;
    }
}

function setDetails(data) {
    const elements = {
        title_name: document.getElementById("title_name"),
        year: document.getElementById("year"),
        poster: document.getElementById("poster"),
        genre: document.getElementById("genre"),
        director: document.getElementById("director"),
        actors: document.getElementById("actors"),
        plot: document.getElementById("plot"),
        rates: document.getElementById("rates")
    };

    if (elements.title_name) elements.title_name.innerText = data.Title || "N/A";
    if (elements.year) elements.year.innerText = data.Year || "N/A";
    if (elements.poster) {
        elements.poster.src = data.Poster && data.Poster !== "N/A" ? data.Poster : 'https://via.placeholder.com/700x500/1a1a1a/ffffff?text=No+Poster';
        elements.poster.alt = data.Title || "Movie Poster";
    }
    if (elements.genre) elements.genre.innerText = data.Genre || "N/A";
    if (elements.director) elements.director.innerText = data.Director || "N/A";
    if (elements.actors) elements.actors.innerText = data.Actors || "N/A";
    if (elements.plot) elements.plot.innerText = data.Plot || "No plot available";
    if (elements.rates) elements.rates.innerText = data.imdbRating ? `${data.imdbRating}/10` : "N/A";
}

function showError(message) {
    const elements = {
        title_name: document.getElementById("title_name"),
        year: document.getElementById("year"),
        poster: document.getElementById("poster"),
        genre: document.getElementById("genre"),
        director: document.getElementById("director"),
        actors: document.getElementById("actors"),
        plot: document.getElementById("plot"),
        rates: document.getElementById("rates")
    };

    if (elements.title_name) elements.title_name.innerText = "Movie Not Found";
    if (elements.year) elements.year.innerText = "N/A";
    if (elements.poster) elements.poster.src = 'https://via.placeholder.com/700x500/cc0000/ffffff?text=Movie+Not+Found';
    if (elements.genre) elements.genre.innerText = "N/A";
    if (elements.director) elements.director.innerText = "N/A";
    if (elements.actors) elements.actors.innerText = "N/A";
    if (elements.plot) elements.plot.innerText = message;
    if (elements.rates) elements.rates.innerText = "N/A";
}

const keywords = [
  "batman","superman","spiderman","avengers","marvel","dc","thor","hulk",
  "captain","star wars","star trek","jurassic","harry potter","james bond",
  "mission impossible","terminator","matrix","transformers",
  "action","fight","assassin","revenge","crime","spy","gangster","chase",
  "war","battle","soldier","killer","police",
  "ghost","horror","zombie","demon","dark","mystery","haunted","nightmare","fear","survival",
  "fairy","wizard","witch","sword","castle","king","queen","prince","princess","beauty","knight",
  "dragon","magic","kingdom","fantasy","legend","quest","future","space","adventure","dream",
  "life","family","story","journey","history","reality"
];

window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById("random-results")) {
        getRandomMovies();
    }
    const keywordResults = document.getElementById("keyword-results");
    const searchInput = document.getElementById("search");
    if (keywordResults && searchInput) {
        searchInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                searchByKeyword(searchInput.value.trim());
                searchInput.value = "";
            }
        });
    }
    setupMoviePageSearch();
});

async function getRandomMovies() {
    let keyword = keywords[Math.floor(Math.random() * keywords.length)];

    try {
        let response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apikey=${apikey}`);
        let data = await response.json();

        if (data.Response === "True") {
            displayRandomMovies(data.Search);
        } else {
            const rr = document.getElementById("random-results");
            if (rr) rr.innerHTML = "<h3>No movies found</h3>";
        }
    } catch (err) {
        console.error("getRandomMovies fetch error:", err);
        const rr = document.getElementById("random-results");
        if (rr) rr.innerHTML = "<h3>Unable to load movies</h3>";
    }
}

function displayRandomMovies(movies) {
    const container = document.getElementById("random-results");
    if (!container) return;

    container.innerHTML = `<div class="movie-grid" id="movies-grid"></div>`;
    const grid = document.getElementById("movies-grid");
    if (!grid) return;

    movies.forEach(movie => {
        const poster = movie.Poster && movie.Poster !== "N/A"
            ? movie.Poster
            : 'https://via.placeholder.com/400x280/1a1a1a/ffffff?text=No+Poster';

        let col = document.createElement("div");
        col.className = "movie-card";

        col.innerHTML = `
            <img src="${poster}" alt="${movie.Title}">
            <div class="card-info">
                <h4 class="title">${movie.Title}</h4>
                <p class="year">${movie.Year}</p>
            </div>
        `;

        grid.appendChild(col);
    });
}

async function searchByKeyword(keyword) {
    if (!keyword) return;
    try {
        let response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(keyword)}&apikey=${apikey}`);
        let data = await response.json();

        if (data.Response === "True") {
            displayKeywordMovies(data.Search);
        } else {
            const container = document.getElementById("keyword-results");
            if (container) container.innerHTML = "<h4>No results found</h4>";
        }
    } catch (err) {
        console.error("searchByKeyword error:", err);
        const container = document.getElementById("keyword-results");
        if (container) container.innerHTML = "<h4>Search failed</h4>";
    }
}

function displayKeywordMovies(movies) {
    const container = document.getElementById("keyword-results");
    if (!container) return; 

    container.innerHTML = "";
    movies.forEach(movie => {
        const poster = movie.Poster && movie.Poster !== "N/A"
            ? movie.Poster
            : 'https://via.placeholder.com/400x280/1a1a1a/ffffff?text=No+Poster';

        let col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";

        col.innerHTML = `
            <div class="movie-card">
                <img src="${poster}" alt="${movie.Title}">
                <div class="card-info">
                    <h4 class="title">${movie.Title}</h4>
                    <p class="year">${movie.Year}</p>
                </div>
            </div>
        `;

        container.appendChild(col);
    });
}

function setupMoviePageSearch() {
    const searchInput = document.getElementById("search");
    if (!searchInput || !window.location.pathname.includes('movie.html')) return;
    
    console.log("Movie page search initialized");
    
    searchInput.addEventListener("keypress", async function(e) {
        if (e.key === "Enter" && this.value.trim()) {
            e.preventDefault();
            console.log("Searching for:", this.value);
            
            const success = await apiCall(this.value);
            if (success) {
                console.log("Movie found and loaded!");
            } else {
                console.log("Movie not found");
            }
            
            this.value = ""; 
        }
    });
}