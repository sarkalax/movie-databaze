import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux/es/hooks/useSelector";

import { stateFavorite } from "../../features/movies";

import MovieCard from "../MovieCard/MovieCard";

export default function Favorite() {
    const favorite = useSelector(stateFavorite);

    return (
        <section className="favorite container">
            <div className="back-arrow" onClick={() => history.back()}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </div>
            <div>
                <h3>Favorite List</h3>
                <div className="container movie-list">
                    {favorite.length == 0 ? (
                        <h3>Favorite list is empty</h3>
                    ) : (
                        favorite.map((fav) => {
                            return <MovieCard key={fav.imdbID} data={fav} />;
                        })
                    )}
                </div>
            </div>
        </section>
    );
}
