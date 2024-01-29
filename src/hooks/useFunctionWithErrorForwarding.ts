/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';

/**
 * This utility hook is designed to assist with forwarding errors to error boundaries.
 *
 * It wraps function passed as an argument with try..catch block and when error occur
 * it is forwarded to closest error boundary.
 */
export const useFunctionWithErrorForwarding = <
  T extends (...args: any[]) => any,
>(
  func: T,
) => {
  const setState = useState()[1];

  return (...args: Parameters<T>) => {
    try {
      func(...args);
    } catch (err) {
      setState(() => {
        throw err;
      });
    }
  };
};
