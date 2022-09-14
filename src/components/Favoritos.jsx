import { Link } from "react-router-dom";

const Favoritos = (props) => {
  return (
    <div className="row">
      {!props.favorites.length && (
        <div>
          {" "}
          <h2 className="col-12 text-danger">
            No tiene agregado favoritos
          </h2>{" "}
        </div>
      )}
      {props.favorites.map((movie, i) => {
        return (
          <div className="col-3" key={i}>
            <div className="card border-primary">
              <img className="card-img-top" src={movie.imgUrl} alt="Title" />
              <button
                className="favorite-btn"
                onClick={props.addOrRemoveFromFavs}
                data-movie-id={movie.id}
              >
                {!movie.selected ? <> 🖤</> : <> ❤</>}
              </button>
              <div className="card-body">
                <h6 className="card-title">{movie.title}</h6>
                <p className="card-text">
                  {movie.overView.substring(0, 200) + "..."}
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
  );
};

export default Favoritos;
