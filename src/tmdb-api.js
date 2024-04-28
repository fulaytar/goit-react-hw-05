import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  params: { language: "ua" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNTA5YTdlMWM3MTgwYjZjOTg1MmI4MzgyMTk5ZTdhYyIsInN1YiI6IjY2Mjk1ZjVhYjlhMGJkMDE2MWQ3MjE2NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.x1iBPkJYfk4YgMMrAEzl919uDXHzDeGCqEiSSZtySck",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get("trending/movie/week", options);
  return response.data.results;
}

export async function getDetailsMovie(id) {
  const response = await axios.get(`movie/${id}`, options);
  return response.data;
}
