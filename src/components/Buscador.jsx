import wAlert from "sweetalert2";
import { useHistory } from "react-router-dom";

const Buscador = () => {
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      wAlert.fire("Escribe una palabra clave");
    } else {
      e.currentTarget.keyword.value = "";
      return history.push(`/resultado?keyword=${keyword}`, { replace: true });
    }
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="mb-3  d-flex">
        <input
          type="text"
          className="form-control ml-10 mr-40 "
          placeholder="Buscar..."
          name="keyword"
        />
        <button type="submit" className="btn btn-primary">
          Buscar
        </button>
      </div>
    </form>
  );
};

export default Buscador;
