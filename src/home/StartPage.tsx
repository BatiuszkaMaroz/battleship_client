import React from 'react';
import { useTranslation } from 'react-i18next';

export default function StartPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('start-page.title')}</h1>
    </div>
  );
}
