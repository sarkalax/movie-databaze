import "./header.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncMovies, fetchAsyncShows, setSearchText } from "../../features/movies";
import { stateSearch } from "../../features/movies";

///LOADING PŘI NAČÍTÁNÍ FILMU - nový state
///SETTINGS SWIPERU DO common

export default function Header() {
    const dispatch = useDispatch();

    const searchValue = useSelector(stateSearch);

    function handleSubmit(e) {
        e.preventDefault();


        if (searchValue == "") return
        else {
            dispatch(fetchAsyncMovies(searchValue));
            dispatch(fetchAsyncShows(searchValue));
    
            dispatch(setSearchText(""));
        }
    }

    return (
        <header className="container">
            <Link to="/">
                <div className="logo">Movie App</div>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to="/movies">Movies</Link>
                    </li>
                    <li>
                        <Link to="/shows">Shows</Link>
                    </li>
                    <li>
                        <Link to="/fav">Favs</Link>
                    </li>
                    <li>
                        <form onSubmit={handleSubmit}>
                            <input type="text" value={searchValue} onChange={(e) => dispatch(setSearchText(e.target.value))} placeholder="Search"/>
                            <button><FontAwesomeIcon icon={faSearch}/></button>
                        </form>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

