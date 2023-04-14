import * as pages from 'src/index/constants/pages';
import company from 'src/index/constants/company';

export default [
  { title: 'main_landing_navbar_dao', routeName: pages.NARFEX_DAO },
  // { title: 'main_landing_navbar_support', routeName: pages.CONTACT },
  { title: 'main_landing_navbar_token', routeName: pages.TOKEN },
  { title: 'main_landing_navbar_docs', href: company.docs },
  {
    title: 'main_landing_navbar_community',
    scrollTo: ['.MainLanding-join-us', '.MainLandingWrapperFooter'],
  },
];
