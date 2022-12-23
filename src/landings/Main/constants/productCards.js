const testDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

export const getImage = (fileName) =>
  require(`src/asset/backgrounds/main-landing/${fileName}`);

export default [
  {
    id: 1,
    title: 'main_landing_product_1_title',
    description: 'main_landing_product_1_description',
    backgroundImage: getImage('product-dex.png'),
    statistics: {
      title: '475,678',
      subtitle: 'main_landing_product_1_statistic_title',
      icon: require('src/asset/24px/track_changes.svg'),
    },
    dark: true,
  },
  {
    id: 2,
    title: 'main_landing_product_2_title',
    description: 'main_landing_product_2_description',
    backgroundImage: getImage('product-token.png'),
    statistics: {
      title: '$0.434',
      subtitle: 'main_landing_product_2_statistic_title',
      icon: require('src/asset/24px/monetization_on.svg'),
    },
    dark: false,
  },
  {
    id: 3,
    title: 'main_landing_product_3_title',
    description: 'main_landing_product_3_description',
    backgroundImage: getImage('product-farming.png'),
    dark: true,
  },
  {
    id: 4,
    title: 'main_landing_product_4_title',
    description: 'main_landing_product_4_description',
    backgroundImage: getImage('product-validator.png'),
    dark: false,
  },
  {
    id: 5,
    title: 'main_landing_product_5_title',
    description: 'main_landing_product_5_description',
    backgroundImage: getImage('product-wallet.png'),
    dark: true,
  },
  {
    id: 6,
    title: 'main_landing_product_6_title',
    description: 'main_landing_product_6_description',
    backgroundImage: getImage('product-referral.png'),
    statistics: {
      title: '75 678',
      subtitle: 'main_landing_product_6_statistic_title',
      icon: require('src/asset/24px/favorite.svg'),
    },
    dark: false,
  },
  {
    id: 7,
    title: 'main_landing_product_7_title',
    description: 'main_landing_product_7_description',
    backgroundImage: getImage('product-mobile-apps.png'),
    statistics: {
      title: '475 678',
      subtitle: 'main_landing_product_7_statistic_title',
      icon: require('src/asset/24px/favorite.svg'),
    },
    dark: true,
    comingSoon: true,
  },
];

/*
<ProductCard
title="Mobile Apps"
description={testDescription}
backgroundImage={getImage('product-mobile-apps.png')}
statistics={
  <ProductCard.Statistics
    title="475 678"
    subtitle="users love"
    icon={<SVG src={require('src/asset/24px/favorite.svg')} />}
  />
}
adaptive={adaptive}
comingSoon
/> */
