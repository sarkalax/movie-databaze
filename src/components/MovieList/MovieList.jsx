import "./movielist.scss";

import MovieCard from "../MovieCard/MovieCard";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { stateMovies } from "../../features/movies";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";

export default function MovieList() {
    const movies = useSelector(stateMovies);

    let useSwiper = window.location.href.includes("movies");

    return (
        <>
            <section className="container">
                <h3>Movies</h3>

                {useSwiper ? (
                    <div className="movie-list">
                        {movies ? (
                            <>
                                {movies.map((movie) => {
                                    return (
                                        <SwiperSlide key={movie.imdbID}>
                                            <MovieCard data={movie} />
                                        </SwiperSlide>
                                    );
                                })}
                            </>
                        ) : (
                            <div>
                                <h4>No movies</h4>
                            </div>
                        )}
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination, A11y]}
                        spaceBetween={10}
                        slidesPerView={5}
                        autoplay={{ delay: 500 }}
                        breakpoints={{
                            1440: {
                                slidesPerView: 8,
                            },
                            760: {
                                slidesPerView: 5,
                            },
                            480: {
                                slidesPerView: 3,
                            },
                            320: { slidesPerView: 1 },
                        }}
                        loop={true}
                        navigation
                        pagination={{ clickable: true }}
                    >
                        <div className="movie-list">
                            {movies ? (
                                <>
                                    {movies.map((movie) => {
                                        return (
                                            <SwiperSlide key={movie.imdbID}>
                                                <MovieCard data={movie} />
                                            </SwiperSlide>
                                        );
                                    })}
                                </>
                            ) : (
                                <div>
                                    <h4>No movies</h4>
                                </div>
                            )}
                        </div>
                    </Swiper>
                )}
            </section>
        </>
    );
}
