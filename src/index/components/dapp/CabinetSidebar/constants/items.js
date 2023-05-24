import * as PAGES from 'src/index/constants/pages';
import company from 'src/index/constants/company';

const items = [
  [
    {
      title: 'dapp_sidebar_dashboard',
      icon: 'dashboard',
      disabled: true,
    },
    {
      title: 'dapp_sidebar_wallet',
      icon: 'wallet',
      active: [PAGES.DAPP_WALLET],
      link: PAGES.DAPP_WALLET,
      type: 'route',
    },
    {
      title: 'dapp_sidebar_history',
      icon: 'history',
      active: [PAGES.DAPP_TRANSACTION_HISTORY],
      link: PAGES.DAPP_TRANSACTION_HISTORY,
      type: 'route',
    },
    {
      title: 'dapp_sidebar_fiat_exchange',
      type: 'block',
      items: [
        {
          title: 'dapp_sidebar_swap',
          icon: 'swap',
          active: [PAGES.DAPP_EXCHANGE],
          link: PAGES.DAPP_EXCHANGE,
          type: 'route',
        },
        {
          title: 'P2P',
          icon: 'p2p',
          active: [PAGES.P2P_ORDERS, PAGES.P2P_ORDER],
          link: PAGES.P2P_ORDERS,
          type: 'route',
        },
        {
          title: 'User center',
          icon: 'team-icon',
          active: [PAGES.P2P_USER_CENTER],
          link: PAGES.P2P_USER_CENTER,
          type: 'route',
        },
      ],
    },
    {
      title: 'dapp_sidebar_earn',
      type: 'block',
      items: [
        {
          title: 'dapp_sidebar_liquidity',
          icon: 'liquidity',
          active: [PAGES.LIQUIDITY],
          link: PAGES.LIQUIDITY,
          type: 'route',
        },
        {
          title: 'dapp_sidebar_farm',
          icon: 'farm',
          active: [PAGES.FARMING],
          link: PAGES.FARMING,
          type: 'route',
        },
        {
          title: 'dapp_sidebar_referral_program',
          icon: 'team-icon',
          active: [
            PAGES.DAPP_REFERRAL,
            PAGES.DAPP_REFERRAL_EXCHANGER,
            PAGES.DAPP_REFERRAL_FARMING,
          ],
          link: PAGES.DAPP_REFERRAL,
          type: 'route',
        },
        {
          title: 'dapp_sidebar_validator',
          icon: 'validator',
          active: [PAGES.DAPP_VALIDATOR],
          link: PAGES.DAPP_VALIDATOR,
          type: 'route',
        },
      ],
    },
  ],
  [
    // {
    //   title: 'dapp_sidebar_trade',
    //   icon: 'trade',
    //   type: 'parent',
    //   active: true,
    //   items: [
    //     {
    //       title: 'dapp_sidebar_swap',
    //       active: [PAGES.DAPP_SWAP],
    //       link: PAGES.DAPP_SWAP,
    //       type: 'route',
    //     },
    //     {
    //       title: 'dapp_sidebar_pro_dex',
    //       type: 'comingSoon',
    //       active: [],
    //       disabled: true,
    //     },
    //   ],
    // },
    {
      title: 'dapp_sidebar_about_nrfx',
      icon: 'nrfx-blue-bg-icon',
      type: 'href',
      active: [],
      link: '/token',
    },
    {
      title: 'dapp_sidebar_more',
      icon: 'more-vertical-icon',
      type: 'parent',
      active: true,
      items: [
        {
          title: 'dapp_sidebar_more_docs',
          link: 'http://docs.narfex.com/narfex',
          type: 'href',
        },
        {
          title: 'dapp_sidebar_more_team',
          link: company.docsTeam,
          type: 'href',
        },
        {
          title: 'dapp_sidebar_more_audit',
          link: 'https://docs.narfex.com/narfex/main/security-audit',
          type: 'href',
        },
        {
          title: 'dapp_sidebar_more_governance',
          link: '/narfex_dao',
          type: 'href',
        },
        {
          title: 'dapp_sidebar_more_social_media',
          link: PAGES.DAPP_SOCIAL_MEDIA,
          type: 'route',
        },
        {
          title: 'dapp_sidebar_more_blog',
          link: 'https://medium.com/@narfex',
          type: 'href',
        },
        {
          title: 'dapp_sidebar_more_terms',
          link: '/terms-of-service',
          type: 'href',
          disabled: true,
        },
      ],
    },
  ],
];

export default items;
