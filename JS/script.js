'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
    const reelButton = document.getElementById('reelButton');
    const reelSVG = document.getElementById('reelSVG');
    const theaterSpace = document.getElementById('theaterSpace');
    const leftRug = document.getElementById('leftRug');
    const centerRug = document.getElementById('centerRug');
    const rightRug = document.getElementById('rightRug');
    const body = document.getElementById('body');
    const movieSearch = document.getElementById('popcornButton');
    const movies = ["Up", "Inception", "The Matrix", "Titanic", "Avatar", "The Dark Knight", "Interstellar", "Forrest Gump", "Toy Story"];


    reelButton.addEventListener('click', function() {
        reelSVG.classList.toggle('spinningReel');
        theaterSpace.classList.toggle('lightsOff');
        leftRug.classList.toggle('lightsOff');
        centerRug.classList.toggle('lightsOff');
        rightRug.classList.toggle('lightsOff');
        body.classList.toggle('blackBody');

        if (leftRug.classList.contains('lightsOff')) {
            leftRug.classList.add('hidden');
            centerRug.classList.add('hidden');
            rightRug.classList.add('hidden');
        } else {
            leftRug.classList.remove('hidden');
            centerRug.classList.remove('hidden');
            rightRug.classList.remove('hidden');
        }
    });

    movieSearch.addEventListener('click', function (event) {
        event.preventDefault();
        console.log('works');
        const title = movies[Math.floor(Math.random() * movies.length)];
        movieLookUp(title);
    });
})

function movieLookUp(title) {
    fetch(`https://www.omdbapi.com/?t=${title}&apikey=3c705b1d`)
        .then(function(response) {
            return response.json()
        })
        .then(function (data) {
            showMovie(data);
        })
        .catch(function (error) {
            console.error("Error!", error);
        })
}

function showMovie(movie) {
    const movieTitle = document.createElement('h2');
    movieTitle.innerText = movie.Title.toUpperCase();

    const movieYear = document.createElement('p');
    movieYear.innerText = movie.Year;

    const movieRated = document.createElement('p');
    movieRated.innerText = movie.Rated;

    const movieGenre = document.createElement('p');
    movieGenre.innerText = movie.Genre;

    const moviePlot = document.createElement('p');
    moviePlot.innerText = movie.Plot;

    const moviePoster = document.createElement('img');
    moviePoster.src = movie.Poster;
    moviePoster.alt = movie.Title;

    const displayOne = document.getElementById('displayOne');
    displayOne.innerHTML = ''; 
    displayOne.appendChild(moviePoster);

    const displayTwo = document.getElementById('displayTwo');
    displayTwo.innerHTML = ''; 
    displayTwo.appendChild(movieTitle);
    displayTwo.appendChild(movieYear);
    displayTwo.appendChild(movieRated);
    displayTwo.appendChild(movieGenre);
    displayTwo.appendChild(moviePlot);

    movie.Ratings.forEach(function (rating) {
        const ratingText = document.createElement('p');
        ratingText.innerText = `${rating.Source}: ${rating.Value}`;
        displayTwo.appendChild(ratingText);

    });
}