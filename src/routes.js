import { DEFAULT_PATHS } from 'config.js';

import Keywords from 'views/keywords/Keywords';
import Dashboard from 'views/dashboard/Dashboard';
import Settings from 'views/settings/Settings';

const appRoot = DEFAULT_PATHS.APP.endsWith('/') ? DEFAULT_PATHS.APP.slice(1, DEFAULT_PATHS.APP.length) : DEFAULT_PATHS.APP;

const routesAndMenuItems = {
  mainMenuItems: [
    {
      path: DEFAULT_PATHS.APP,
      redirect: true,
      to: `${appRoot}/dashboard`,
    },
    {
      path: DEFAULT_PATHS.LOGIN,
      redirect: true,
      to: `${appRoot}/login`,
    },
    {
      path: `${appRoot}/dashboard`,
      label: 'Tableau De Bord',
      icon: 'chart-2',
      component: Dashboard,
    },
    {
      path: `${appRoot}/keywords`,
      label: 'Mots Clés',
      icon: 'shop',
      component: Keywords,
    },
    {
      path: `${appRoot}/settings`,
      label: 'Paramétres',
      icon: 'gear',
      component: Settings,
    },

    /* {
      path: `${appRoot}/settings`,
      label: 'Settings',
      icon: 'gear',
      component: VerticalPage,
    }, */
  ],
  sidebarItems: [],
};
export default routesAndMenuItems;
