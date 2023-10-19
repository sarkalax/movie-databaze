import "./moviedetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faStar,
    faThumbsUp,
    faFilm,
    faCalendar,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateDetail } from "../../features/movies";

import { fetchAsyncDetail } from "../../features/movies";
import { useDispatch } from "react-redux";

//CLEAN UP
import { removeSelectedMov } from "../../features/movies";

export default function MovieDetail() {
    const { imdbID } = useParams();

    const data = useSelector(stateDetail);
    const dispatch = useDispatch();

    const {
        Title,
        Year,
        Runtime,
        imdbRating,
        imdbVotes,
        Genre,
        Writer,
        Director,
        Actors,
        Plot,
        Awards,
        Poster,
    } = data;

    useEffect(() => {
        dispatch(fetchAsyncDetail(imdbID));

        return () => {
            dispatch(removeSelectedMov());
        };
    }, [dispatch, imdbID]);

    return (
        <main className="container">
            <div className="back-arrow" onClick={() => history.back()}>
                <FontAwesomeIcon icon={faArrowLeft} /> Back
            </div>
            {Object.keys(data).length === 0 ? (
                <div>Loading...</div>
            ) : (
                <div className="detail">
                    <div className="section-left">
                        <div className="title">{Title}</div>

                        <div className="rating">
                            <span>
                                IMDB Rating: <FontAwesomeIcon icon={faStar} />
                                {imdbRating}
                            </span>
                            <span>
                                IMDB Votes:{" "}
                                <FontAwesomeIcon icon={faThumbsUp} />{" "}
                                {imdbVotes}
                            </span>
                            <span>
                                Runtime: <FontAwesomeIcon icon={faFilm} />{" "}
                                {Runtime}{" "}
                            </span>
                            <span>
                                Year: <FontAwesomeIcon icon={faCalendar} />{" "}
                                {Year}
                            </span>
                        </div>
                        <div className="plot">{Plot}</div>
                        <div className="info">
                            <div className="info-left">
                                <span>Director</span>
                                <span>Actors</span>
                                <span>Writer</span>
                                <span>Genres</span>
                                <span>Awards</span>
                            </div>
                            <div className="info-right">
                                <span>{Director}</span>
                                <span>{Writer}</span>
                                <span>{Actors}</span>
                                <span>{Genre}</span>
                                <span>{Awards}</span>
                            </div>
                        </div>
                    </div>
                    <div className="section-right">
                        <div className="poster">
                            <img src={Poster} alt={`${Title} poster`} />
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
