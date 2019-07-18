import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import listenersPlugin from 'router5-plugin-listeners';
import * as pages from './constants/pages';

export const routes = [
  {
    name: pages.MAIN,
    path: '/',
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
    name: pages.EXCHANGE,
    path: '/exchange',
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
  {
    name: pages.INVESTMENT,
    path: '/investment',
  },
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
    name: pages.CABINET_INVESTMENTS,
    path: '/investments',
  }
];

const params = {
  defaultRoute: pages.NOT_FOUND,
  defaultParams: {}
};

let router = createRouter(routes, params);
router.usePlugin(browserPlugin({ base: '', useHash: false }));
router.usePlugin(listenersPlugin());

export default router;
