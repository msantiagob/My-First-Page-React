//Libraries
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

//Components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalles from "./components/Detalles";
import Resultados from "./components/Resultados";
import Favoritos from "./components/Favoritos";

//Styles
import "./css/app.css";
import "./css/bootstrap.css";

const App = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const favMovies = localStorage.getItem("favs");

  let tempMoviesInFavs = [];

  if (favMovies === null) {
    tempMoviesInFavs = [];
  } else {
    tempMoviesInFavs = JSON.parse(favMovies);
  }

  const addOrRemoveFromFavs = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgUrl = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector(".card-title").innerText;
    const overView = parent.querySelector("p").innerText;
    const movieData = {
      imgUrl,
      title,
      overView,
      id: btn.dataset.movieId,
      selected: true,
    };

    let movieIsArray = tempMoviesInFavs.find((movie) => {
      return movie.id === movieData.id;
    });
    if (!movieIsArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
      console.log(tempMoviesInFavs);
    } else {
      let movieLeft = tempMoviesInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(movieLeft));
      setFavorites(movieLeft);
    }
  };
  return (
    <>
      <Header favorites={favorites} />
      <div className="container mt-2 mb-3">
        <Switch>
          <Route path="/" component={Login} exact></Route>

          <Route
            path="/listado"
            render={(props) => (
              <Listado
                favorites={favorites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
                {...props}
              />
            )}
          ></Route>
          <Route path="/detalles" component={Detalles}></Route>
          <Route
            path="/resultado"
            render={(props) => (
              <Resultados
                favorites={favorites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
                {...props}
              />
            )}
          ></Route>
          <Route
            path="/favoritos"
            render={(props) => (
              <Favoritos
                favorites={favorites}
                addOrRemoveFromFavs={addOrRemoveFromFavs}
                {...props}
              />
            )}
          ></Route>
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default App;
