import { useCallback, useEffect, useState } from "react";
import { getApod, type ApodItem, type ApodQuery } from "../services";

interface UseApodState {
  data: ApodItem | null;
  loading: boolean;
  error: string | null;
}

/** Busca a Imagem Astronômica do Dia com estados de loading/erro e retry. */
export function useApod(query: ApodQuery = {}) {
  const [state, setState] = useState<UseApodState>({ data: null, loading: true, error: null });
  // Serializa para não refazer a requisição a cada render com objeto novo
  const queryKey = JSON.stringify(query);

  const load = useCallback(() => {
    setState({ data: null, loading: true, error: null });
    getApod(JSON.parse(queryKey) as ApodQuery)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err: Error) => setState({ data: null, loading: false, error: err.message }));
  }, [queryKey]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, retry: load };
}
