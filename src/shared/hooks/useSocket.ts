import { useCallback, useEffect, useState } from 'react';
import useTypedSelector from './useTypedSelector';

const useSocket = <T extends object>(endpoint: string) => {
  const [data, setData] = useState<T | object>({});
  const [error, setError] = useState<any | null>(null);
  const [locked, setLocked] = useState<boolean>(false);
  const io = useTypedSelector((state) => state.connect.io);

  const emitter = useCallback(
    (...args: any[]) => {
      if (locked) return;

      setLocked(true);
      io?.emit(endpoint, ...args);
    },
    [io, setLocked, endpoint, locked],
  );

  const listener = useCallback(
    (resData: any) => {
      if (resData.message) {
        console.log(resData.message);
      }

      setData(resData);
    },
    [setData],
  );

  const errorListener = useCallback(
    (error: any) => {
      if (error.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred.');
      }
    },
    [setError],
  );

  const unlocker = useCallback(() => {
    setLocked(false);
  }, [setLocked]);

  const acceptError = useCallback(() => {
    setLocked(false);
    setError(null);
  }, [setError]);

  useEffect(() => {
    io?.on(endpoint, listener);
    io?.on('error', errorListener);

    return () => {
      io?.off(endpoint, listener);
      io?.off('error', errorListener);
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
