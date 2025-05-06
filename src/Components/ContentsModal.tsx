import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { IGetMoviesResult, IGetTvSerisResult, IMovie, ITvSeries } from "../api";
import { makeImagePath } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Layout = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  height: 100vh;
  top: 0;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Contents = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 35vw;
  height: 80vh;
  border-radius: 15px;
  background-color: ${(props) => props.theme.black.lighter};
`;

const Poster = styled.div`
  width: 100%;
  height: 50vh;
  background-size: cover;
  background-position: center center;
`;

const TitleWrapper = styled.div`
  position: absolute;
  top: 45vh;
  display: flex;
  justify-content: space-around;
  gap: 100px;
  align-items: center;
  width: 100%;
  padding: 0 10px;
`;
const Title = styled.div`
  height: 25px;
  font-size: 25px;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Overview = styled.div`
  width: 100%;
  line-height: 1.6;
  padding: 0 10px;
  padding-top: 10px;
  font-size: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;
  margin-left: auto;
`;

const Rate = ({ score }: { score: number }) => {
  const stars = Math.round(score / 2);
  return (
    <Stars>
      {Array.from({ length: 5 }, (_, i) => (
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          color={i < stars ? "gold" : "gray"}
        />
      ))}
    </Stars>
  );
};

function ContentsModal({
  data,
  layoutId,
}: {
  data: IGetMoviesResult | IGetTvSerisResult;
  layoutId: string;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const onOverlayClick = () => {
    navigate(
      location.pathname.split("/").length === 3
        ? "/"
        : `/${location.pathname.split("/")[1]}`
    );
  };
  if (!params) return;
  const movie = data.results.find((movie) => movie.id === +params.movieId!);
  const isMovie = (item: IMovie | ITvSeries): item is IMovie => {
    return "title" in item;
  };
  if (!movie) return null;
  return (
    <AnimatePresence>
      <Layout
        onClick={onOverlayClick}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Contents layoutId={layoutId}>
          <Poster
            style={{
              backgroundImage: `linear-gradient(to top, black, transparent),url(${makeImagePath(
                movie?.backdrop_path + "",
                "w500"
              )})`,
            }}
          />
          <TitleWrapper>
            <Title>{isMovie(movie) ? movie?.title : movie.name}</Title>
            <Rate score={movie.vote_average} />
          </TitleWrapper>
          <Overview>{movie?.overview ? movie.overview : "정보 없음"}</Overview>
        </Contents>
      </Layout>
    </AnimatePresence>
  );
}

export default ContentsModal;
