import { useEffect } from "react";

import { fetchAsyncMovies, fetchAsyncShows, setFirstVisitFav  } from "../features/movies";
import { useDispatch } from "react-redux";

export default function fetchData(searchTitle) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncMovies(searchTitle));
        dispatch(fetchAsyncShows(searchTitle));

        dispatch(setFirstVisitFav());        
    }, [dispatch]); 
}