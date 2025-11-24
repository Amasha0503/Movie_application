console.log("js loaded")

let apikey="40911ae8"; 

let title=document.getElementById("search");

title.addEventListener("keypress",e => {
    if (e.key == "Enter") {
        apiCall(title.value);
    }
});

let apiCall = async (title_name) => {
    await fetch(`http://www.omdbapi.com/?t=${title_name}&apikey=${apikey}`)
    .then(res => res.json())
    .then(data => {
        setDetails(data);
        console.log(title_name);
    });
};

let setDetails=(data)=>{
    let title_name=document.getElementById("title_name");
    let year=document.getElementById("year");
    let poster=document.getElementById("poster");
    let genre=document.getElementById("genre");
    let director=document.getElementById("director");
    let actors=document.getElementById("actors");
    let plot=document.getElementById("plot");
    let ratings=document.getElementById("rates");

    title_name.innerText=data.Title;
    year.innerText=data.Year;
    poster.src=data.Poster;
    genre.innerText=data.Genre;
    director.innerText=data.Director;
    actors.innerText=data.Actors;
    plot.innerText=data.Plot;
    ratings.innerText=data.imdbRating;

}
    


const keywords = [
    "batman","superman","spiderman","avengers","marvel","dc","thor","hulk",
  "captain","star wars","star trek","jurassic","harry potter","james bond",
  "mission impossible","terminator","matrix","transformers",

  "action","fight","assassin","revenge","crime","spy","gangster","chase",
  "war","battle","soldier","killer","police",

  "ghost","horror","zombie","demon","dark","mystery","haunted","nightmare","fear","survival",

  "love","romance","heart","wedding","kiss","relationship","valentine",

  "dragon","magic","kingdom","fantasy","legend","quest","future","space","adventure","dream",

  "life","family","story","journey","history","reality"
];


window.onload = () => {
    getRandomMovies();
};

async function getRandomMovies() {
    let keyword = keywords[Math.floor(Math.random() * keywords.length)];

    let response = await fetch(`https://www.omdbapi.com/?s=${keyword}&apikey=${apikey}`);
    let data = await response.json();

    if (data.Response === "True") {
        displayRandomMovies(data.Search);
    } else {
        document.getElementById("random-results").innerHTML = "<h3>No movies found</h3>";
    }
}

function displayRandomMovies(movies) {

    let container = document.getElementById("random-results"); // FIX
    container.innerHTML = ""; 
    movies.forEach(movie => {
    let col = document.createElement("div");
    col.className = "movie-card";

    col.innerHTML = `
        <div class="movie-card">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h4>${movie.Title}</h4>
            <p>${movie.Year}</p>
        </div>
    `;

    col.addEventListener("click", () => {
        window.location.href = "movie.html?title=" + encodeURIComponent(movie.Title);
    });

    container.appendChild(col);
});
}



let keywordInput = document.getElementById("search");

keywordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchByKeyword(keywordInput.value);
    }
});

async function searchByKeyword(keyword) {
    let response = await fetch(`https://www.omdbapi.com/?s=${keyword}&apikey=${apikey}`);
    let data = await response.json();

    if (data.Response === "True") {
        displayKeywordMovies(data.Search);
    } else {
        document.getElementById("keyword-results").innerHTML = 
            "<h4>No results found</h4>";
    }
}

function displayKeywordMovies(movies) {
    let container = document.getElementById("keyword-results");
    container.innerHTML = ""; 

    movies.forEach(movie => {
        let col = document.createElement("div");
        col.className = "col-6 col-md-4 col-lg-3";

        col.innerHTML = `
            <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <h4>${movie.Title}</h4>
                <p>${movie.Year}</p>
            </div>
        `;

        col.addEventListener("click", () => {
            window.location.href = "movie.html?title=" + encodeURIComponent(movie.Title);
        });

        container.appendChild(col);
    });
}


