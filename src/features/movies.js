import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { movieAPI } from "../common/APIs/movieAPI";
const { baseURL, key } = movieAPI;

export const fetchAsyncMovies = createAsyncThunk(
    "movies/fetchAsyncMovies",
    async (search) => {
        const data = await fetch(
            `${baseURL}?s=${search}&type=movie&apikey=${key}`
        ).then((response) => response.json());

        return data.Search;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    "shows/fetchAsyncShows",
    async (search) => {
        const data = await fetch(
            `${baseURL}?s=${search}&type=series&apikey=${key}`
        ).then((response) => response.json());

        return data.Search; //tady .Search!! je to array
    }
);

export const fetchAsyncDetail = createAsyncThunk(
    "/movies/fetchAsyncDetail",
    async (id) => {
        const data = fetch(`${baseURL}?i=${id}&apikey=${key}`).then(
            (response) => response.json()
        );

        return data; //tady pouze data!!! je to objekt
    }
);
//===> kontrolovat strukturu dat!

const initialState = {
    valueMov: [],
    valueShow: [],
    valueDetail: [],
    valueFavorite: [],
    searchValue: "",
};
const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMov: (state) => {
            state.valueDetail = initialState.valueDetail;
        },
        setFirstVisitFav: (state) => {
            const fav = JSON.parse(localStorage.getItem("FavMov"));

            if (!fav) {
                state.valueFavorite = [];
                localStorage.setItem(
                    "FavMov",
                    JSON.stringify(state.valueDetail)
                );
            } else {
                state.valueFavorite = fav;
            }
        },
        setFavorite: (state, actions) => {
            const fav = JSON.parse(localStorage.getItem("FavMov"));
            const dontAdd = fav.find(
                (item) => item.imdbID == actions.payload.imdbID
            );

            if (dontAdd) {
                window.alert("Item has already been added");
                return;
            }
            state.valueFavorite = [...state.valueFavorite, actions.payload];
            localStorage.setItem("FavMov", JSON.stringify(state.valueFavorite));
        },
        removeFromFavorite: (state, actions) => {
            const filtred = state.valueFavorite.filter(
                (fav) => fav.imdbID !== actions.payload
            );

            state.valueFavorite = filtred;
            localStorage.setItem("FavMov", JSON.stringify(state.valueFavorite));
        },
        setSearchText: (state, actions) => {
            state.searchValue = actions.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAsyncMovies.pending, () => {
                // console.log("movies pending")
            })
            .addCase(fetchAsyncMovies.fulfilled, (state, action) => {
                // console.log("movies data fetched")
                state.valueMov = action.payload;
            })
            // .addCase(fetchAsyncMovies.rejected, () => {
            //     console.log("movies fetch rejected")
            // })

            .addCase(fetchAsyncShows.fulfilled, (state, actions) => {
                // console.log("shows data fetched")
                state.valueShow = actions.payload;
            })

            .addCase(fetchAsyncDetail.fulfilled, (state, actions) => {
                state.valueDetail = actions.payload;
            });
    },
});

export const {
    removeSelectedMov,
    setFirstVisitFav,
    setFavorite,
    removeFromFavorite,
    setSearchText,
} = moviesSlice.actions;
export const stateMovies = (state) => state.movies.valueMov;
export const stateShows = (state) => state.movies.valueShow;
export const stateDetail = (state) => state.movies.valueDetail;
export const stateSearch = (state) => state.movies.searchValue;
export const stateFavorite = (state) => state.movies.valueFavorite;
export default moviesSlice.reducer;
