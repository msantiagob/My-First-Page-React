import Swal from "sweetalert2";
import axios from "axios";

import { Redirect, useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  let token = sessionStorage.getItem("token");
  const submitHandler = (e) => {
    e.preventDefault();

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email === "" || password === "") {
      Swal.fire({
        title: "Error Autenticacion!",
        text: "Campos no pueden estar vacios",
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }
    if (email !== "" && !regexEmail.test(email)) {
      Swal.fire({
        title: "Error Autenticacion!",
        text: "Debes escribir un correo valido",
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }
    if (email !== "challenge@alkemy.org" || password !== "react") {
      Swal.fire({
        title: "Error Autenticacion!",
        text: "Datos invalidos",
        icon: "error",
        confirmButtonText: "OK",
      });

      return;
    }
    axios
      .post("http://challenge-react.alkemy.org/", {
        email,
        password,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "datos enviados",
          showConfirmButton: false,
          timer: 1500,
        });

        console.log(res.data);
        const tokenRecibido = res.data.token;
        sessionStorage.setItem("token", tokenRecibido);
        return history.push("/Listado");
      });
  };
  return (
    <div
      className="border border-5  rounded mt-5 

    "
    >
      {token && <Redirect to={"/listado"} />}
      <div className="p-5  ">
        <h2>Iniciar sesión:</h2>
        <form className="m-4" onSubmit={submitHandler}>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label pt-5">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Constraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
