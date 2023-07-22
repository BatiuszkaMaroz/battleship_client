import { useForwardError } from 'hooks/useForwardError';
import { useFunctionWithErrorForwarding } from 'hooks/useFunctionWithErrorForwarding';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function StartPage() {
  const { t } = useTranslation();
  const forwardError = useForwardError();

  const throwError = () => {
    throw new Error('Test error');
  };
  const throwErrorWithForward = useFunctionWithErrorForwarding(throwError);

  const throwAsyncError = async () => {
    try {
      await new Promise(() => {
        throw new Error('Test async error');
      });
    } catch (err) {
      forwardError(err);
    }
  };

  return (
    <div>
      <h1>{t('start-page.title')}</h1>
      <button onClick={throwErrorWithForward}>Throw error</button>
      <button onClick={throwAsyncError}>Throw async error</button>
    </div>
  );
}
