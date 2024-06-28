import { likedMoviesListArticle } from "../nodes.mjs";
import { createMovies } from "../utils/create-movies.mjs";
import { likedMoviesList } from "../utils/like-movie.mjs";

const getLikedMovies = () => {
  const likedMovies = likedMoviesList();
  const moviesArray = {
    results: Object.values(likedMovies),
  };
  console.log(moviesArray);
  console.log(likedMoviesListArticle);

  createMovies(moviesArray, likedMoviesListArticle, {
    lazyLoad: true,
    clean: true,
  });

  console.log(likedMovies);
};

export { getLikedMovies };
