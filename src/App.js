import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";

function App() {
  const urlApi = "http://localhost:3001/palabras/";
  const [editando, setEditando] = useState(false);
  const { superFetch, cargando, error } = useFetch();
  const [palabras, setPalabras] = useState([]);
  const [inputPalabra, setInputPalabra] = useState("");
  const cargarPalabras = useCallback(async () => {
    const datos = await superFetch(urlApi);
    setPalabras(datos);
  }, [superFetch]);

  const borrarPalabra = async (id) => {
    const datos = await superFetch(urlApi + id, {
      method: "DELETE",
    });
    setPalabras(palabras.filter((palabra) => palabra.id !== id));
  };

  const crearPalabra = async (palabra) => {
    const nuevaPalabra = await superFetch(urlApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palabra),
    });
    setPalabras([...palabras, nuevaPalabra]);
  };
  const modificarPalabra = async (palabra) => {
    const palabraModificada = await superFetch(urlApi + palabra.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(palabra),
    });
    setPalabras(
      palabras.map((palabraBuscada) => {
        if (palabraBuscada.id === palabra.id) {
          return palabraModificada;
        } else {
          return palabraBuscada;
        }
      })
    );
  };
  const enviarForm = (e) => {
    e.preventDefault();
    crearPalabra({ texto: inputPalabra, maximo: 0, esLenguaje: false });
  };
  const borrarPalabraAxios = async (id) => {
    const resp = await axios.delete(urlApi + id);
    if (resp.statusText === "OK") {
      setPalabras(palabras.filter((palabra) => palabra.id !== id));
    }
  };
  const cargarPalabrasAxios = async () => {
    const datos = await axios.get(urlApi);
    setPalabras(datos.data);
  };
  useEffect(() => {
    cargarPalabras();
  }, [cargarPalabras]);
  return (
    <>
      {error && (
        <img
          className="img-error"
          src="data:image/jpeg;base64,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"
          alt="gato enfadado"
        />
      )}
      {cargando && (
        <img
          className="img-loading"
          src="https://pbs.twimg.com/profile_images/2167035896/123cat_400x400.jpg"
          alt="gato feliz"
        />
      )}
      <h1>Palabras</h1>
      <form onSubmit={enviarForm}>
        <input
          type="text"
          value={inputPalabra}
          onChange={(e) => setInputPalabra(e.target.value)}
        />
        <button type="submit">Crear</button>
      </form>
      <ul className="list-unstyled">
        {palabras.map((palabra) => (
          <li key={palabra.id}>
            {palabra.texto} (
            <span
              onClick={() =>
                modificarPalabra({ ...palabra, texto: palabra.texto + "!" })
              }
            >
              M
            </span>
            )(<span onClick={() => borrarPalabra(palabra.id)}>X</span>)
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
