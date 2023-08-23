import { useState } from 'react';

/**
 * This utility hook is designed to assist with forwarding errors to error boundaries.
 *
 * It takes error passed as an argument and forwards it to closest error boundary.
 */
export const useForwardError = () => {
  const setState = useState()[1];

  return (err: unknown) => {
    setState(() => {
      throw err;
    });
  };
};
