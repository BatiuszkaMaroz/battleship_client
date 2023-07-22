import React from 'react';
import { createRoot } from 'react-dom/client';

import 'config/i18n';
import Root from 'Root';
import 'services/socket';

const container = document.getElementById('root');

if (container) {
  createRoot(container).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
  );
} else {
  throw new Error('Root container not found.');
}
