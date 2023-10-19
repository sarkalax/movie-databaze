import { stateShows } from "../../features/movies";
import { useSelector } from "react-redux/es/hooks/useSelector";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/controller";

import MovieCard from "../MovieCard/MovieCard";

export default function ShowsList() {
    const shows = useSelector(stateShows);

    let useSwiper = window.location.href.includes("shows");

    return (
        <div className="container">
            <h3>Series</h3>
            {!shows ? (
                <h4>No serials</h4>
            ) : useSwiper ? (
                <div className="show-list">
                    {shows.map((show) => {
                        return <MovieCard key={show.imdbID} data={show} />;
                    })}
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
                    <div className="show-list">
                        {shows.map((show) => {
                            return (
                                <SwiperSlide key={show.imdbID}>
                                    <MovieCard data={show} />
                                </SwiperSlide>
                            );
                        })}
                    </div>
                </Swiper>
            )}
        </div>
    );
}
