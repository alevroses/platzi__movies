const likedMoviesList = () => {
  const item = JSON.parse(localStorage.getItem("results"));
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }

  return movies;
};

const likeMovie = (movie) => {
  const likedMovies = likedMoviesList();

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
    
    console.log("ya estaba, elimina we");
  } else {
    likedMovies[movie.id] = movie;

    console.log("no estaba, se debe añadir");
  }

  localStorage.setItem(
    "results",
    JSON.stringify(likedMovies)
  );
  console.log(likedMovies, "xdxd");
};

export { likeMovie, likedMoviesList };
