'use strict'

function selectHighestRatedMovie(movies) {
    let selectedMovie = null;
    movies.forEach(movie => {
        if (!selectedMovie || selectedMovie.rating < movie.rating)
        selectedMovie = movie;
    });

    return selectedMovie;
}

module.exports = selectHighestRatedMovie;
