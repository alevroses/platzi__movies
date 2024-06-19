import { authorization } from "../parameters.mjs";

const getPagination = async (page) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?language=en-US&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization,
      },
    }
  );

  const data = await response.json();
  console.log(data);

  return data;
};

export { getPagination };
