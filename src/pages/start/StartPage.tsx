import React from 'react';

import Layout from 'components/Layout';
import { usePlayerStore } from 'stores/usePlayerStore';
import StartPageLogin from './StartPageLogin';
import StartPageMenu from './StartPageMenu';

export default function StartPage() {
  const playerStore = usePlayerStore();

  if (playerStore.id) {
    return (
      <Layout>
        <StartPageMenu />
      </Layout>
    );
  } else {
    return <StartPageLogin />;
  }
}
