import styled from "styled-components";
import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import { getMovies, IGetTvSerisResult } from "../api";
import { useQuery } from "react-query";

const Wrapper = styled.div`
  background-color: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  font-size: 24px;
  width: 50%;
`;

const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: -120px;
  gap: 100px;
`;

function TvShows() {
  

  const { data, isLoading } = useQuery<IGetTvSerisResult>(
    ["tv", "airing_today"],
    () => getMovies("tv", "airing_today",1)
  );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading....</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderWrapper>
            <Slider series="tv" type="airing_today" sliderId="1"></Slider>
            <Slider series="tv" type="popular" sliderId="2"></Slider>
            <Slider series="tv" type="top_rated" sliderId="3"></Slider>
          </SliderWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default TvShows;
