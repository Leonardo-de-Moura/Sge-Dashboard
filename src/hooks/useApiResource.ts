import { useEffect, useState } from 'react';
import { apiGet, unwrapList } from '../services/api';

interface ApiResourceState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useApiResource<T>(path: string): ApiResourceState<T> {
  const [state, setState] = useState<ApiResourceState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let active = true;

    apiGet<T[] | { data?: T[]; items?: T[] }>(path)
      .then((payload) => {
        if (active) setState({ data: unwrapList(payload), loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            data: [],
            loading: false,
            error: error instanceof Error ? error.message : 'Não foi possível carregar os dados.',
          });
        }
      });

    return () => {
      active = false;
    };
  }, [path]);

  return state;
}
