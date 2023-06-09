import * as pages from '../pages';

const routes = [
  {
    name: pages.VALIDATOR,
    path: '/validator',
  },
  {
    name: pages.VALIDATOR_CREATE_TRADE,
    path: '/dapp/validator/create_offer',
  },
  {
    name: pages.VALIDATOR_EDIT_TRADE,
    path: '/dapp/validator/edit_offer/:offerAddress',
  },
  {
    name: pages.VALIDATOR_ADMIN_PANEL,
    path: '/dapp/validator/admin_panel',
  },
];

export default routes;
