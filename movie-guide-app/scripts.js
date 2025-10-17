
let searchBox = document.querySelector(".inputBox");
let searchForm = document.querySelector("form");
let movieContainer = document.querySelector(".movie-container");


// function to fetch movie details using OMDB API

const getMovieInfo = async (movie) =>{
    try {
         const myApiKey = "165da957";
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;


    const res = await fetch(url);

    if(!res.ok){
        throw new Error("unable to fetch movie data.");
    }
    
    const data = await res.json();

    showMovieData(data);

    }

    catch (error) {
         showErrorMessage("No Movie Found!");
    }
   

}

/* function to show movie data on screen */

const showMovieData = (data) =>{

    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');

    // use Destructuring assignment to extract properties from data object
    const {Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
                               <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

     const movieGenreElement = document.createElement('div');
     movieGenreElement.classList.add('movie-genre');

     Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML = element;
        movieGenreElement.appendChild(p);
     });

     movieElement.appendChild(movieGenreElement);
        
     movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
                                <p><strong>Duration: </strong>${Runtime}</p>
                                <p><strong>Cast: </strong>${Actors}</p>
                                <p><strong>plot: </strong>${Plot}</p>`

    
    // creating a div for movie poster

    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;

    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
                              
}

//function to display error message 
const showErrorMessage = (message) =>{
    movieContainer.innerHTML = `<h2>${message}</h2>`;
        movieContainer.classList.add('noBackground');
}

// function to handle form submission 
const handleFormSubmission = (e) => {
     e.preventDefault();
    const movieName = searchBox.value.trim();
    console.log(searchBox.value);
    if(movieName !== ""){
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(movieName);
    }else{
        showErrorMessage('Enter The Movie Name To Get a Movie Information');
    }
}
/* adding eventlistner */
searchForm.addEventListener("submit", handleFormSubmission);
   

