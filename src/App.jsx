import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SharedLayout from "./components/SharedLayout/SharedLayout";
import Home from "./components/Home/Home";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import ErrorPage from "./components/ErrorPage/ErrorPage";

import MovieList from "./components/MovieList/MovieList";
import ShowsList from "./components/ShowsList/ShowsList";
import Favorite from "./components/Favorite/Favorite";

import fetchData from "./common/fetchData";

function App() {
    fetchData("Harry");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SharedLayout/>}>
                    <Route index element={<Home/>}/>
                    <Route path="/fav" element={<Favorite/>}/>
                    <Route path="/movies" element={<MovieList/>}/>
                    <Route path="/shows" element={<ShowsList/>}/>
                    <Route path="/movies/movie/:imdbID" element={<MovieDetail/>}/>
                    <Route path="*" element={<ErrorPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
