// styles
// external
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import listenersPlugin from 'router5-plugin-listeners';
import * as modalGroup from './actions/modalGroup';
// internal
import * as pages from './index/constants/pages';
import * as adminPages from './admin/constants/pages';

export const routes = process.env.DOMAIN === 'admin' ? [
  {
    name: adminPages.MAIN,
    path: '/',
  },
  {
    name: adminPages.PANEL,
    path: `/panel`,
  },
  {
    name: adminPages.PANEL_PAGE,
    path: `/panel/:page`,
  },
  {
    name: adminPages.NOT_FOUND,
    path: '/not_found',
  }
] : [
  {
    name: pages.MAIN,
    path: '/',
  },
  {
    name: pages.MENU,
    path: '/menu',
  },
  {
    name: pages.NOTIFICATIONS,
    path: '/notifications',
  },
  {
    name: pages.ABOUT,
    path: '/about',
  },
  {
    name: pages.MISSION,
    path: '/mission',
  },
  {
    name: pages.HISTORY,
    path: '/history',
  },
  {
    name: pages.SITE_EXCHANGE,
    path: `/${pages.SITE_EXCHANGE}`,
  },
  {
    name: pages.WALLET,
    path: '/wallet',
  },
  {
    name: pages.ROBOTS,
    path: '/robots',
  },
  {
    name: pages.TECHNOLOGY,
    path: '/technology',
  },
  {
    name: pages.SAFETY,
    path: '/safety',
  },
  {
    name: pages.COMMERCE,
    path: '/commerce',
  },
  // {
  //   name: pages.INVESTMENT,
  //   path: '/investment',
  // },
  {
    name: pages.CONTACT,
    path: '/contact',
  },
  {
    name: pages.FAQ,
    path: '/faq',
  },
  {
    name: pages.HELLO,
    path: '/hello',
  },
  {
    name: pages.UIKIT,
    path: '/uikit',
  },
  {
    name: pages.NOT_FOUND,
    path: '/not_found',
  },
  // Cabinet routes (temorarily like this)
  {
    name: pages.CABINET_WALLET,
    path: '/cabinet_wallet',
  },
  {
    name: pages.SETTINGS,
    path: '/settings',
  },
  {
    name: pages.PROFILE,
    path: '/profile',
    params: { section: 'test' }
  },
  {
    name: pages.INVESTMENTS,
    path: '/investments',
  },
  {
    name: pages.CHANGE_EMAIL,
    path: '/change_email',
  },
  {
    name: pages.REGISTER,
    path: '/register',
  },
  {
    name: pages.RESET_PASSWORD,
    path: '/reset_password',
  },
  // {
  //   name: pages.EXCHANGE,
  //   path: `/${pages.EXCHANGE}`,
  // },
  {
    name: pages.MERCHANT,
    path: '/merchant/:merchant/:status',
  },
  {
    name: pages.FEE,
    path: '/fee',
  },
  {
    name: pages.TRADER,
    path: '/trader',
  }
];

const params = {
  // defaultRoute: pages.NOT_FOUND,
  allowNotFound: true,
  defaultParams: {},
  strictQueryParams: true,
  trailingSlash: true,
  useTrailingSlash: false,
  queryParamsMode: 'loose',
};

let router = createRouter(routes, params);
router.usePlugin(browserPlugin({
  base: '',
  useHash: false,
  hashPrefix: '',
  mergeState: true,
  preserveHash: false,
  // forceDeactivate: true,
}));
router.usePlugin(listenersPlugin());

router.addListener((state, prevState)  => {
  if (prevState && prevState.params && prevState.params.modal_group && !state.params.modal_group) {
    modalGroup.modalGroupClear();
  }
  if (state.params && state.params.modal_group) {
    modalGroup.modalGroupSetActiveModal(state.params.modal_group);
  }
});

export default router;
