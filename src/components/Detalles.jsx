import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import wAlert from "sweetalert2";

const Detalles = () => {
  let token = sessionStorage.getItem("token");

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=7ae583d8001c2b447459b1b6b422f792&language=es-US`;

    axios
      .get(endPoint)
      .then((res) => {
        const movieData = res.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
        wAlert.fire("algo se daño");
      });
  }, [movieID]);

  return (
    <>
      {!token && <Redirect to={"/"} />}
      {!movie && <p> Cargando... </p>}
      {movie && (
        <>
          <h3>{movie.title}</h3>
          <div className="row">
            <div className="col-4">
              <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="Title"
              />
            </div>
            <div className="col-8">
              <h5>Fecha de estreno: {movie.release_date}</h5>
              <h5>Reseña:</h5>
              <p>{movie.overview}</p>
              <h5>Generos:</h5>
              <ul>
                {movie.genres.map((oneGenre) => (
                  <li key={oneGenre.id}>{oneGenre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detalles;
