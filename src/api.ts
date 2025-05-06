const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWYxNzM2YjQ4YjA5Mzg2NTk2MTczYjMwYmMwYjNkMyIsIm5iZiI6MTc0NTU2MzAxMC44MzcsInN1YiI6IjY4MGIyZDgyNmFhMWY5MGM3ZGFhOGIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n989MY6zsUETfZDuARMwdsPbg8Bh9gyGGIyMvt-xX7g";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetTvSerisResult {
  page: number;
  results: ITvSeries[];
  total_pages: number;
  total_results: number;
}

export interface ITvSeries {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: number;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

export async function getMovies(series: string, type: string, page: number) {
  const url = `/api/${series}/${type}?language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
  };

  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const json = res.json();
      return json;
    }
  } catch (e) {
    console.error(e);
  }
}

export async function searchResults(
  series: string,
  keyword: string,
  page: number
) {
  const url = `api/search/${series}?query=${keyword}&include_adult=false&language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const res = await fetch(url, options);
    if (res.ok) {
      const json = res.json();
      return json;
    }
  } catch (e) {
    console.error(e);
  }
}
