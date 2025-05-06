import { Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Header from "./Components/Header";
import Movies from "./Routes/Movies";
import TvShows from "./Routes/TvShows";
import TopButton from "./Components/TopButton";
import ContactButton from "./Components/ContactButton";
import ContentsList from "./Routes/ContentsList";

function App() {
  return (
    <>
      <Header />
      <TopButton />
      <ContactButton />
      <Routes>
        <Route path="/movie/:type/:movieId" element={<Movies />}></Route>
        <Route path="/movie/:type" element={<ContentsList />}></Route>
        <Route path="/movie" element={<Movies />}></Route>
        <Route path="/tv/:type/:movieId" element={<TvShows />}></Route>
        <Route path="/tv/:type" element={<ContentsList />}></Route>
        <Route path="/tv" element={<TvShows />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/:type/:movieId" element={<Home />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
