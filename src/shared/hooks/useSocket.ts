import { useEffect, useState, useCallback } from 'react';
import useTypedSelector from './useTypedSelector';

const useSocket = <T extends object = {}>(endpoint: string) => {
  const [data, setData] = useState<T | {}>({});
  const [error, setError] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const io = useTypedSelector((state) => state.connect.io)!;

  const emitter = useCallback(
    (...args: any[]) => {
      if (loading) return;

      setLoading(true);
      io.emit(endpoint, ...args);
    },
    [io, setLoading, endpoint, loading],
  );

  const listener = useCallback(
    (resData: any) => {
      setData(resData);
    },
    [setData],
  );

  const errorListener = useCallback(
    (error: any) => {
      if (error.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    },
    [setError],
  );

  const unlocker = useCallback(() => {
    setLoading(false);
  }, [setLoading]);

  const acceptError = useCallback(() => {
    setLoading(false);
    setError(null);
  }, [setError]);

  useEffect(() => {
    io.on(endpoint, listener);
    io.on('error', errorListener);

    return () => {
      io.off(endpoint, listener);
      io.off('error', errorListener);
    };
  }, [io, endpoint, listener, errorListener]);

  return {
    data: data as T,
    emitter,
    error,
    unlocker,
    acceptError,
  };
};

export default useSocket;
