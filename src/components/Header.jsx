import { Link } from "react-router-dom";
import Buscador from "./Buscador";

const Header = (props) => {
  return (
    <header className=" justify-content-center  container">
      <nav className="">
        <ul className="nav nav-pills nav-fill  ">
          <li className="nav-item  mx-auto">
            <Link to={"/"} className="nav-link bg-light" aria-current="page">
              <h5>Home</h5>
            </Link>
          </li>
          <li className="nav-item ">
            <Link to={"/listado"} className="nav-link bg-light">
              <h5>Listado</h5>
            </Link>
          </li>
          <li className="nav-item ">
            <Link to={"/favoritos"} className="nav-link bg-light">
              <h5>
                Favoritos{" "}
                <span className="badge  text-light bg-primary">
                  {props.favorites.length > 0 && <> {props.favorites.length}</>}
                </span>
              </h5>
            </Link>
          </li>
        </ul>
      </nav>
      <Buscador />
    </header>
  );
};

export default Header;
