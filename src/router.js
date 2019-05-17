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
    name: pages.HELLO,
    path: '/hello',
  },
  {
    name: pages.UIKIT,
    path: '/uikit',
  },
];

const params = {
  defaultRoute: pages.MAIN,
  defaultParams: {}
};

let router = createRouter(routes, params);
router.usePlugin(browserPlugin({ base: '', useHash: false }));
router.usePlugin(listenersPlugin());

export default router;
