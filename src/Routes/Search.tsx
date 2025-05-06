import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IMovie, ITvSeries, searchResults } from "../api";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useEffect } from "react";

const SearchWrapper = styled.div`
  margin-top: 100px;
  padding: 0 60px;
  width: 100%;
  height: 100vh;
`;
const SearchTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
`;
const SearchResultWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 100px;
`;
const Section = styled.div``;
const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const BoxWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:nth-child(6n + 1) {
    transform-origin: center left;
  }
  &:nth-child(6n) {
    transform-origin: center right;
  }
  &:first-child(:only-child) {
    transform: center left;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

interface IMovieResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

interface ITvResult {
  page: number;
  results: ITvSeries[];
  total_pages: number;
  total_results: number;
}

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.3,
      duration: 0.1,
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      duration: 0.1,
      tyle: "tween",
    },
  },
};

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  if (!keyword) return;

  const { data: tvData, isLoading: tvLoading } = useQuery<ITvResult>(
    ["tv", keyword],
    () => searchResults("tv", keyword,1)
  );
  const { data: movieData, isLoading: movieLoading } = useQuery<IMovieResult>(
    ["movie", keyword],
    () => searchResults("movie", keyword,1)
  );
  useEffect(() => {}, [keyword]);
  return (
    <SearchWrapper>
      <SearchTitle>'{keyword}' 에 대한 검색 결과입니다.</SearchTitle>
      <SearchResultWrapper>
        {movieLoading ? (
          <div>movieData Loading...</div>
        ) : (
          <Section>
            {movieData?.total_results === 0 ? null : (
              <Title>Movie {movieData?.total_results}건</Title>
            )}
            <BoxWrapper>
              {movieData?.results.map((movie, index) => (
                <Box
                  variants={boxVariants}
                  key={index}
                  initial="normal"
                  whileHover="hover"
                  bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
            </BoxWrapper>
          </Section>
        )}
        {tvLoading ? (
          <div>tvData Loading...</div>
        ) : (
          <Section>
            {tvData?.total_results === 0 ? null : (
              <Title>Tv {tvData?.total_results}건</Title>
            )}
            <BoxWrapper>
              {tvData?.results.map((tv, index) => (
                <Box
                  variants={boxVariants}
                  key={index}
                  initial="normal"
                  whileHover="hover"
                  bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{tv.name}</h4>
                  </Info>
                </Box>
              ))}
            </BoxWrapper>
          </Section>
        )}
      </SearchResultWrapper>
    </SearchWrapper>
  );
}

export default Search;
