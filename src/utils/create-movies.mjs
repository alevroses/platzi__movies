import { preview } from "../nodes.mjs";
import { test } from "./lazy-loader.mjs";

const createMovies = (
  data,
  preview,
  { lazyLoad = false, clean = true } = {}
) => {
  if (clean) {
    preview.innerHTML = "";
  }

  data.results.map((movie) => {
    const container = document.createElement("div");
    container.classList.add("movie-container");
    container.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}`;
    });

    const img = document.createElement("img");
    img.classList.add("movie-img");
    img.setAttribute("alt", movie.title);
    img.setAttribute(
      lazyLoad ? "data-src" : "src",
      `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    );

    /* img.addEventListener("error", () => {
      img.setAttribute("src", "../img/default.png");
    }); */

    if (lazyLoad) {
      test(img);
    }

    /* img.srcset = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; */
    img.loading = "lazy";
    // img.setAttribute("loading", "lazy");

    container.append(img);
    preview.append(container);
  });
};

export { createMovies };
