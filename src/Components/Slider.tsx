import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import styled from "styled-components";
import {
  getMovies,
  IGetMoviesResult,
  IGetTvSerisResult,
  IMovie,
  ITvSeries,
} from "../api";
import { makeImagePath } from "../utils";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ContentsModal from "./ContentsModal";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SliderWrapper = styled.div`
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 250px;
  gap: 10px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  padding: 0 15px;
  margin-bottom: 20px;
  gap: 12px;
`;

const SliderTitle = styled.div`
  background-color: transparent;
  font-size: 24px;
  font-weight: bold;
`;

const SliderIcon = styled(motion.svg)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const Row = styled(motion.div)`
  display: grid;
  position: absolute;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  width: 100%;
  margin-bottom: 10px;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:nth-child(6) {
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

const PrevButton = styled(motion.div)`
  position: absolute;
  width: 40px;
  height: 200px;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 24px;
`;
const NextButton = styled(motion.div)`
  position: absolute;
  right: 0;
  width: 40px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  font-size: 24px;
`;

const rowVariants = {
  initial: ({ direction, width }: { direction: boolean; width: number }) => ({
    x: direction ? width + 5 : -(width + 5),
  }),
  visible: {
    x: 0,
  },
  exit: ({ direction, width }: { direction: boolean; width: number }) => ({
    x: direction ? -(width + 5) : width + 5,
  }),
};

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

const buttonVariants = {
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
};

const offset = 6;

function Slider({
  series,
  type,
  sliderId,
}: {
  series: string;
  type: string;
  sliderId: string;
}) {
  type QueryResultType<T extends string> = T extends "movie"
    ? IGetMoviesResult
    : IGetTvSerisResult;
  const { data, isLoading } = useQuery<QueryResultType<typeof series>>(
    [series, type],
    () => getMovies(series, type, 1)
  );
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [direction, setDirection] = useState(true);
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const params = useParams();
  const isMovie = (item: IMovie | ITvSeries): item is IMovie => {
    return "title" in item;
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onClickedTitle = () => {
    navigate(`/${series}/${type}`);
  };
  const clickedMovie =
    params.movieId &&
    data?.results.find((movie) => movie.id === +params.movieId!);
  const onBoxClicked = (movieId: number) => {
    navigate(`${location.pathname.replace(/\/$/, "")}/${type}/${movieId}`);
  };

  const increaseIndex = () => {
    if (data && !leaving) {
      setDirection(true);
      toggleLeaving();
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const decreaseIndex = () => {
    if (data && !leaving) {
      setDirection(false);
      toggleLeaving();
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  if (!data) return;
  const totalMovies = data?.results.length - 1;
  const maxIndex = Math.ceil(totalMovies / offset) - 1;

  const width = ref.current?.offsetWidth;
  return isLoading ? (
    <Loader>Loading....</Loader>
  ) : (
    <SliderWrapper ref={ref}>
      <TitleWrapper>
        <SliderTitle>{type}</SliderTitle>
        <SliderIcon onClick={onClickedTitle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </SliderIcon>
      </TitleWrapper>
      <AnimatePresence
        custom={{ direction, width }}
        initial={false}
        onExitComplete={() => setLeaving(false)}
      >
        <Row
          variants={rowVariants}
          custom={{ direction, width }}
          initial="initial"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                layoutId={`${type}-${movie.id}`}
                variants={boxVariants}
                key={`${sliderId}-${type}-${movie.id}`}
                initial="normal"
                whileHover={leaving ? undefined : "hover"}
                bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                onClick={() => onBoxClicked(movie.id)}
              >
                <Info variants={infoVariants}>
                  <h4>{isMovie(movie) ? movie.title : movie.name}</h4>
                </Info>
              </Box>
            ))}
          {index === 0 ? null : (
            <PrevButton
              variants={buttonVariants}
              key="prev"
              initial="initial"
              whileHover={{ opacity: 1 }}
              onClick={decreaseIndex}
            >
              🔙
            </PrevButton>
          )}
          {index == maxIndex ? null : (
            <NextButton
              variants={buttonVariants}
              key="next"
              initial="initial"
              whileHover={{ opacity: 1 }}
              onClick={increaseIndex}
            >
              🔜
            </NextButton>
          )}
        </Row>
        {params.type === type && clickedMovie && (
          <ContentsModal data={data} layoutId={`${type}-${clickedMovie.id}`} />
        )}
      </AnimatePresence>
    </SliderWrapper>
  );
}

export default Slider;
