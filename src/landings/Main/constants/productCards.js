const testDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

export const getImage = (fileName) =>
  require(`src/asset/backgrounds/main-landing/${fileName}`);

export default [
  {
    id: 1,
    title: 'Dex & Liquidity',
    description: testDescription,
    backgroundImage: getImage('product-dex.png'),
    statistics: {
      title: '475,678',
      subtitle: 'transaction',
      icon: require('src/asset/24px/track_changes.svg'),
    },
    dark: true,
  },
  {
    id: 2,
    title: 'NRFX Token',
    description: testDescription,
    backgroundImage: getImage('product-token.png'),
    statistics: {
      title: '$0.434',
      subtitle: 'price',
      icon: require('src/asset/24px/monetization_on.svg'),
    },
    dark: false,
  },
  {
    id: 3,
    title: 'Farming',
    description: testDescription,
    backgroundImage: getImage('product-farming.png'),
    dark: true,
  },
  {
    id: 4,
    title: 'Validator',
    description: testDescription,
    backgroundImage: getImage('product-validator.png'),
    dark: false,
  },
  {
    id: 5,
    title: 'Wallet',
    description: testDescription,
    backgroundImage: getImage('product-wallet.png'),
    dark: true,
  },
  {
    id: 6,
    title: 'Referral Program',
    description: testDescription,
    backgroundImage: getImage('product-referral.png'),
    statistics: {
      title: '75 678',
      subtitle: 'users love',
      icon: require('src/asset/24px/favorite.svg'),
    },
    dark: false,
  },
  {
    id: 7,
    title: 'Mobile Apps',
    description: testDescription,
    backgroundImage: getImage('product-mobile-apps.png'),
    statistics: {
      title: '475 678',
      subtitle: 'users love',
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
