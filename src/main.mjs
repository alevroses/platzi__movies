import { getTrendingMovies } from "./API/get-trending-movies.mjs";
import { getCategories } from "./API/get-categories.mjs";
import {
  genericSection,
  headerSection,
  movieDetailCategoriesList,
  movieDetailDescription,
  movieDetailScore,
  movieDetailTitle,
  preview,
  previewCat,
  relatedMoviesContainer,
} from "./nodes.mjs";
import { getByCategory } from "./API/get-by-category.mjs";
import { createMovies } from "./utils/create-movies.mjs";
import { createCategories } from "./utils/create-categories.mjs";
import { getSearch } from "./API/get-search.mjs";
import { getMovieById } from "./API/get-movie-by-id.mjs";
import { getSimilar } from "./API/get-similar.mjs";
import { getPagination } from "./API/get-pagination.mjs";
// import { page } from "./navigation.mjs";

let maxPage;
let page = 1;

window.onbeforeunload = () => {
  scrollTo(0, 0);
};

const showTrendingMovies = async () => {
  const data = await getTrendingMovies();

  preview.innerHTML = "";

  createMovies(data, preview, true);
};

const showCategories = async () => {
  const data = await getCategories();

  previewCat.innerHTML = "";

  createCategories(data, previewCat);
};

const showByCategory = async (id) => {
  const data = await getByCategory(id);
  //console.log(data);

  genericSection.innerHTML = "";

  maxPage = data.total_pages;
  console.log(maxPage);

  createMovies(data, genericSection, {
    lazyLoad: true,
    clean: false, //da igual
  });
};

const paginationDataCategory = (id) => {
  // scrollTop + clientHeight = scrollHeight

  const closure = async () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement;

    const scrollIsBottom =
      scrollTop + clientHeight >= scrollHeight - 15;

    const pageIsNotMax = page <= maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const data = await getByCategory(id, page);

      createMovies(data, genericSection, {
        lazyLoad: true,
        clean: false, //false?
      });
    }
  };

  return closure;
};

const showSearch = async (query) => {
  const data = await getSearch(query);
  console.log("Show search: ", data);

  maxPage = data.total_pages;
  console.log(maxPage);

  createMovies(data, genericSection);
};

const paginationDataSearch = (query) => {
  // scrollTop + clientHeight = scrollHeight

  const closure = async () => {
    const { scrollTop, clientHeight, scrollHeight } =
      document.documentElement;

    const scrollIsBottom =
      scrollTop + clientHeight >= scrollHeight - 15;

    const pageIsNotMax = page <= maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const data = await getSearch(query, page);

      createMovies(data, genericSection, {
        lazyLoad: true,
        clean: false, //false?
      });
    }
  };

  return closure;
};

const showTrending = async () => {
  const data = await getTrendingMovies();

  maxPage = data.total_pages;

  createMovies(data, genericSection, {
    lazyLoad: true,
    clean: true,
  });
};

const paginationData = async () => {
  // scrollTop + clientHeight = scrollHeight
  const { scrollTop, clientHeight, scrollHeight } =
    document.documentElement;

  const scrollIsBottom =
    scrollTop + clientHeight >= scrollHeight - 15;

  const pageIsNotMax = page <= maxPage;

  if (scrollIsBottom && pageIsNotMax) {
    page++;
    const data = await getPagination(page);

    createMovies(data, genericSection, {
      lazyLoad: true,
      clean: false, //false?
    });
  }

  // Loading Button
  // const btnLoadMore = document.createElement("button");
  /* btnLoadMore.innerText = "Loading more";
  genericSection.append(btnLoadMore); */
};

// window.addEventListener("scroll", paginationData);

const showMovieById = async (id) => {
  const data = await getMovieById(id);

  const movieImgUrl = `https://image.tmdb.org/t/p/w500${data.poster_path}`;

  console.log(movieImgUrl);

  headerSection.style.background = `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.35) 19.27%,
      rgba(0, 0, 0, 0) 29.17%
    ),
    url(${movieImgUrl})
  `;

  movieDetailTitle.textContent = data.title;
  movieDetailDescription.textContent = data.overview;
  movieDetailScore.textContent = data.vote_average;

  createCategories(data, movieDetailCategoriesList);
  showSimilar(id);
};

const showSimilar = async (id) => {
  const data = await getSimilar(id);

  createMovies(data, relatedMoviesContainer);
};

export {
  showCategories,
  showTrendingMovies,
  showByCategory,
  showSearch,
  showTrending,
  showMovieById,
  paginationData,
  paginationDataSearch,
  paginationDataCategory,
};
