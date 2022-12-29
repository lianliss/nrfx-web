// styles
// external
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import listenersPlugin from 'router5-plugin-listeners';
// internal
import * as pages from './index/constants/pages';
import * as adminPages from './admin/constants/pages';

// routes
import validatorRoutes from 'src/index/constants/validator/routes';
import dappRoutes from 'src/index/constants/dapp/routes';

export const routes =
  process.env.DOMAIN === 'admin'
    ? [
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
        },
      ]
    : [
        {
          name: pages.MAIN,
          path: '/',
        },
        {
          name: pages.BUY_BITCOIN,
          path: '/buy_bitcoin',
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
          name: pages.WALLET_SWAP,
          path: '/wallet/swap',
        },
        {
          name: pages.WALLET_CRYPTO,
          path: '/wallet/crypto/:currency',
        },
        {
          name: pages.WALLET_FIAT,
          path: '/wallet/fiat/:currency',
        },
        {
          name: pages.TOKENSALE,
          path: '/tokensale',
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
        // {
        //   name: pages.FAQ,
        //   path: "/faq"
        // },
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
          name: pages.FIAT,
          path: '/fiat',
        },
        {
          name: pages.SETTINGS,
          path: '/settings',
        },
        {
          name: pages.PARTNERS,
          path: '/partners',
          params: { section: 'test' },
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
        {
          name: pages.EXCHANGE,
          path: `/${pages.EXCHANGE}`,
        },
        {
          name: pages.MERCHANT,
          path: '/merchant/:merchant/:status',
        },
        // {
        //   name: pages.FEE,
        //   path: '/fee',
        // },
        {
          name: pages.TOKEN,
          path: '/token',
        },
        {
          name: pages.TRADER,
          path: '/trader',
        },
        {
          name: pages.DOCUMENTATION,
          path: '/documentation',
        },
        {
          name: pages.DOCUMENTATION_PAGE,
          path: '/documentation/page/:page',
        },
        {
          name: pages.DOCUMENTATION_API,
          path: '/documentation/api',
        },
        {
          name: pages.DOCUMENTATION_API_LIST,
          path: '/documentation/api/:path',
        },
        {
          name: pages.DOCUMENTATION_API_METHOD,
          path: '/documentation/api/method/:key',
        },
        {
          name: pages.NARFEX_DAO,
          path: '/narfex_dao',
        },
        {
          name: pages.FARMING_INSTRUCTION,
          path: '/farming_instruction',
        },
        {
          name: pages.TERMS_OF_SERVICE,
          path: '/terms-of-service',
        },
        {
          name: pages.PRIVATE_POOLS,
          path: '/private_pools',
        },
        ...dappRoutes,
        ...validatorRoutes,
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

router.usePlugin(
  browserPlugin({
    base: '',
    useHash: false,
    hashPrefix: '',
    mergeState: true,
    preserveHash: false,
    // forceDeactivate: true,
  })
);

router.usePlugin(listenersPlugin());

router.addListener((state, prevState) => {
  if (state.params.path === '/profile') {
    router.navigate(pages.PARTNERS);
  }

  // Scroll to top when route change.
  if (!state || !prevState) return;
  // Remove double scroll on redirect.
  if (state.name === pages.DAPP) return;
  if (state.name === prevState.name) return;
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const ref = new URLSearchParams(window.location.search).get('ref');
if (ref) {
  window.localStorage.setItem('nrfx-ref', ref);
}

export default router;
