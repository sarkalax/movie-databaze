import "./home.scss";
import MovieList from "../MovieList/MovieList";
import ShowsList from "../ShowsList/ShowsList";

export default function Home() {
    return (
        <main>
            <MovieList />
            <ShowsList />
        </main>
    );
}
