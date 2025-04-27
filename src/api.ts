const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWYxNzM2YjQ4YjA5Mzg2NTk2MTczYjMwYmMwYjNkMyIsIm5iZiI6MTc0NTU2MzAxMC44MzcsInN1YiI6IjY4MGIyZDgyNmFhMWY5MGM3ZGFhOGIyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n989MY6zsUETfZDuARMwdsPbg8Bh9gyGGIyMvt-xX7g";

interface IMovie {
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

export async function getMovies() {
  const url = `api/movie/now_playing?language=ko-KR&page=1`;
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
  };

  try {
    const res = await fetch(url, options);
    const json = res.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}

export async function name(movieId: number) {
  const url = `api/movie/${movieId}?language=ko-KR`;
  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: `Bearer ${API_KEY}` },
  };

  try {
    const res = await fetch(url, options);
    const json = res.json();
    return json;
  } catch (e) {
    console.error(e);
  }
}
