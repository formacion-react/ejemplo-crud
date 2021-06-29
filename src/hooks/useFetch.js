import { useCallback, useState } from "react";

export const useFetch = () => {
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);
  const superFetch = useCallback(async (url, config = {}) => {
    try {
      setCargando(true);
      setError(false);
      const resp = await fetch(url, config);
      const datosAPI = await resp.json();
      setCargando(false);
      return datosAPI;
    } catch {
      setError(true);
      setCargando(false);
    }
  }, []);
  return {
    cargando,
    error,
    superFetch,
  };
};
