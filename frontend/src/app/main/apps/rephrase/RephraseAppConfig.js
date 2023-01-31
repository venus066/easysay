import {lazy} from 'react';

const RephraseAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: '/apps/rephrase',
      component: lazy(() => import('./RephraseApp')),
    },
  ],
};

export default RephraseAppConfig;
