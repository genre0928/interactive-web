import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  getMovies,
  IGetMoviesResult,
  IGetTvSerisResult,
  IMovie,
  ITvSeries,
} from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  margin-top: 100px;
  padding: 0 60px;
  width: 100%;
  height: 100vh;
`;

const ContentTitle = styled.div`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 50px;
`;

const ContentWrapper = styled.div`
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

function ContentsList() {
  type QueryResultType<T extends string> = T extends "movie"
    ? IGetMoviesResult
    : IGetTvSerisResult;
  const { type } = useParams();
  const location = useLocation();
  const isMovie = (item: IMovie | ITvSeries): item is IMovie => {
    return "title" in item;
  };
  const series = location.pathname.includes("tv")
    ? "tv"
    : location.pathname.includes("movie")
    ? "movie"
    : "";
  if (!type) return;
  const { data, isLoading } = useQuery<QueryResultType<typeof series>>(
    [type],
    () => getMovies(series, type, 50)
  );
  return (
    <Wrapper>
      <ContentTitle>{type} 상세 정보 페이지</ContentTitle>
      {isLoading ? (
        <div>Loading....</div>
      ) : (
        <ContentWrapper>
          {data?.results.map((movie, index) => (
            <Box
              variants={boxVariants}
              key={index}
              initial="normal"
              whileHover="hover"
              bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
            >
              <Info variants={infoVariants}>
                <h4>{isMovie(movie) ? movie.title : movie.name}</h4>
              </Info>
            </Box>
          ))}
        </ContentWrapper>
      )}
    </Wrapper>
  );
}

export default ContentsList;
