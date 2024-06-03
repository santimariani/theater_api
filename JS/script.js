'use strict';

document.addEventListener('DOMContentLoaded', function(event) {
    const reelButton = document.getElementById('reelButton');
    const reelSVG = document.getElementById('reelSVG');
    const popcornSVG = document.getElementById('popcornSVG');
    const theaterSpace = document.getElementById('theaterSpace');
    const leftRug = document.getElementById('leftRug');
    const centerRug = document.getElementById('centerRug');
    const rightRug = document.getElementById('rightRug');
    const body = document.getElementById('body');
    const movieSearch = document.getElementById('popcornButton');
    const movies = [
        'Citizen Kane', 'Casablanca', 'The Godfather', 'Gone with the Wind', 
        'Lawrence of Arabia', 'The Wizard of Oz', 'The Graduate', 'On the Waterfront', 
        'Schindler\'s List', 'Singin\' in the Rain', 'It\'s a Wonderful Life', 
        'Sunset Boulevard', 'The Bridge on the River Kwai', 'Some Like It Hot', 
        'Star Wars', 'All About Eve', 'The African Queen', 'Psycho', 'Chinatown', 
        'One Flew Over the Cuckoo\'s Nest', 'The Grapes of Wrath', '2001: A Space Odyssey', 
        'The Maltese Falcon', 'Raging Bull', 'E.T. the Extra-Terrestrial', 'Dr. Strangelove', 
        'Bonnie and Clyde', 'Apocalypse Now', 'Mr. Smith Goes to Washington', 
        'The Treasure of the Sierra Madre', 'Annie Hall', 'The Godfather Part II', 
        'High Noon', 'To Kill a Mockingbird', 'It Happened One Night', 'Midnight Cowboy', 
        'The Best Years of Our Lives', 'Double Indemnity', 'Doctor Zhivago', 
        'North by Northwest', 'West Side Story', 'Rear Window', 'King Kong', 
        'The Birth of a Nation', 'A Streetcar Named Desire', 'A Clockwork Orange', 
        'Taxi Driver', 'Jaws', 'Snow White and the Seven Dwarfs', 'Butch Cassidy and the Sundance Kid', 
        'The Philadelphia Story', 'From Here to Eternity', 'Amadeus', 
        'All Quiet on the Western Front', 'The Sound of Music', 'M*A*S*H', 'The Third Man', 
        'Fantasia', 'Rebel Without a Cause', 'Raiders of the Lost Ark', 'Vertigo', 
        'Tootsie', 'Stagecoach', 'Close Encounters of the Third Kind', 'The Silence of the Lambs', 
        'Network', 'The Manchurian Candidate', 'An American in Paris', 'Shane', 
        'The French Connection', 'Forrest Gump', 'Ben-Hur', 'Wuthering Heights', 'The Gold Rush', 
        'Dances with Wolves', 'City Lights', 'American Graffiti', 'Rocky', 'The Deer Hunter', 
        'The Wild Bunch', 'Modern Times', 'Giant', 'Platoon', 'Fargo', 'Duck Soup', 
        'Mutiny on the Bounty', 'Frankenstein', 'Easy Rider', 'Patton', 'The Jazz Singer', 
        'My Fair Lady', 'A Place in the Sun', 'The Apartment', 'Goodfellas', 
        'Pulp Fiction', 'The Searchers', 'Bringing Up Baby', 'Unforgiven', 
        'Guess Who\'s Coming to Dinner', 'Yankee Doodle Dandy', 'The General', 
        'Intolerance', 'The Fellowship of the Ring', 'Nashville', 'Sullivan\'s Travels', 
        'Cabaret', 'Who\'s Afraid of Virginia Woolf?', 'Saving Private Ryan', 
        'The Shawshank Redemption', 'In the Heat of the Night', 'All the President\'s Men', 
        'Spartacus', 'Sunrise', 'Titanic', 'A Night at the Opera', '12 Angry Men', 
        'The Sixth Sense', 'Swing Time', 'Sophie\'s Choice', 'The Last Picture Show', 
        'Do the Right Thing', 'Blade Runner', 'Toy Story'
    ];
    const reelSound = document.getElementById('reelSound');
    const popcornSound = document.getElementById('popcornSound');


    function fadeInAudio(audio) {
        audio.volume = 0;
        audio.play();
        let fadeAudio = setInterval(() => {
            if (audio.volume < 1.0) {
                audio.volume += 0.1;
            } else {
                clearInterval(fadeAudio);
            }
        }, 200); // Adjust the interval to control the fade-in speed
    }

    function toggleAudio(audio) {
        if (audio.paused) {
            fadeInAudio(audio);
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }


    reelButton.addEventListener('click', function() {
        reelSVG.classList.toggle('spinningReel');
        theaterSpace.classList.toggle('lightsOff');
        leftRug.classList.toggle('lightsOff');
        centerRug.classList.toggle('lightsOff');
        rightRug.classList.toggle('lightsOff');
        body.classList.toggle('blackBody');

        toggleAudio(reelSound);
    

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

        popcornSVG.classList.add('shake');
        setTimeout(() => {
            popcornSVG.classList.remove('shake');
        }, 1300);
        toggleAudio(popcornSound);

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

    const movieYear = document.createElement('h2');
    movieYear.innerText = movie.Year;

    const movieTitleYear = document.createElement('h2');
    movieTitleYear.innerText = `${movie.Title} (${movie.Year})`;

    const movieGenre = document.createElement('p');
    movieGenre.innerText = movie.Genre;

    const movieRated = document.createElement('p');
    movieRated.innerText = movie.Rated;

    const moviePlot = document.createElement('p');
    moviePlot.innerText = movie.Plot;

    const movieYearGenreRated = document.createElement('p');
    movieYearGenreRated.innerText = `${movie.Genre} • ${movie.Rated}`;

    const moviePoster = document.createElement('img');
    moviePoster.src = movie.Poster;
    moviePoster.alt = movie.Title;

    const displayOne = document.getElementById('displayOne');
    displayOne.innerHTML = ''; 
    displayOne.appendChild(moviePoster);

    const displayTwo = document.getElementById('displayTwo');
    displayTwo.innerHTML = ''; 
    displayTwo.appendChild(movieTitleYear);
    displayTwo.appendChild(movieYearGenreRated);
    displayTwo.appendChild(moviePlot);

    movie.Ratings.forEach(function (rating) {
        const ratingText = document.createElement('p');
        ratingText.innerText = `${rating.Source}: ${rating.Value}`;
        displayTwo.appendChild(ratingText);

    });
}