import "./moviecard.scss";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { setFavorite, removeFromFavorite } from "../../features/movies";
import { useDispatch } from "react-redux";
import { useRef } from "react";

export default function MovieCard(props) {
    const { data } = props;
    const { Title, Year, imdbID, Poster } = data;

    const dispatch = useDispatch();

    const favIcon = useRef();

    const currentPageFav = window.location.href.includes("fav");

    return (
        <>
            <div className="movie-card show-card swiper-slide">
                <Link to={`/movies/movie/${imdbID}`}>
                    <img src={Poster} alt={`${Title} poster`} loading="lazy" />
                    <h3>{Title}</h3>{" "}
                    <p>
                        <small>{Year}</small>
                    </p>
                </Link>
                <div className="icons">
                    {currentPageFav ? (
                        <FontAwesomeIcon
                            icon={faTrash}
                            onClick={() => dispatch(removeFromFavorite(imdbID))}
                        />
                    ) : (
                        <FontAwesomeIcon
                            ref={favIcon}
                            icon={faPlus}
                            onClick={() => {
                                dispatch(setFavorite(data));
                                favIcon.current.style.display = "none";
                            }}
                        />
                    )}
                </div>
            </div>
        </>
    );
}
