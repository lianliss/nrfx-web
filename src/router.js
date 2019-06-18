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
    name: pages.WALLET,
    path: '/wallet',
  },
  {
    name: pages.ROBOTS,
    path: '/robots',
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
    name: pages.HELLO,
    path: '/hello',
  },
  {
    name: pages.UIKIT,
    path: '/uikit',
  },
];

const params = {
  defaultRoute: pages.UIKIT,
  defaultParams: {}
};

let router = createRouter(routes, params);
router.usePlugin(browserPlugin({ base: '', useHash: true }));
router.usePlugin(listenersPlugin());

export default router;
