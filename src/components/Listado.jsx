import axios from "axios";
import wAlert from "sweetalert2";
import { useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";

const Listado = (props) => {
  const favoritesId = props.favorites.map((favorites) => favorites.id);
  console.log(favoritesId);
  let token = sessionStorage.getItem("token");

  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=7ae583d8001c2b447459b1b6b422f792&language=es-US&page=1&with_watch_monetization_types=flatrate";

    axios
      .get(endPoint)
      .then((res) => {
        const apiData = res.data;
        setMovieList(apiData.results);
      })
      .catch((error) => {
        wAlert.fire("algo se daño");
      });
  }, [setMovieList]);

  return (
    <>
      {!token && <Redirect to={"/"} />}
      <div className="row">
        {movieList.map((movie, i) => {
          return (
            <div className="col-3" key={i}>
              <div className="card border-primary">
                <img
                  className="card-img-top"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt="Title"
                />
                <button
                  className="favorite-btn"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={movie.id}
                >
                  {!favoritesId.some((id) => id === movie.id + "") ? (
                    <> 🖤</>
                  ) : (
                    <> ❤</>
                  )}
                </button>
                <div className="card-body">
                  <h6 className="card-title">{movie.title}</h6>
                  <p className="card-text">
                    {movie.overview.substring(0, 200) + "..."}
                  </p>
                  <Link
                    to={`/detalles?movieID=${movie.id}`}
                    className="btn btn-primary"
                    aria-current="page"
                  >
                    Detalles
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Listado;
