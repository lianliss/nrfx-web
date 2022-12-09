import React from 'react';

// Components
import { Row } from 'ui';
import Slider from 'dapp/ui/Slider/Slider';
import ProductCard from '../ProductCard';

// Styles
import './index.less';

function ProductCards() {
  const testDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

  const getImage = (fileName) =>
    require(`src/asset/backgrounds/main-landing/${fileName}`);
  return (
    <Slider className="MainLanding-ProductCards">
      <Row className="MainLanding-ProductCards__slider">
        <ProductCard
          title="Dex & Liquidity"
          description={testDescription}
          backgroundImage={getImage('product-dex.png')}
        />
        <ProductCard
          title="NRFX Token"
          description={testDescription}
          backgroundImage={getImage('product-token.png')}
        />
        <ProductCard
          title="Farming"
          description={testDescription}
          backgroundImage={getImage('product-farming.png')}
        />
        <ProductCard
          title="Validator"
          description={testDescription}
          backgroundImage={getImage('product-validator.png')}
        />
        <ProductCard
          title="Wallet"
          description={testDescription}
          backgroundImage={getImage('product-wallet.png')}
        />
        <ProductCard
          title="Referral Program"
          description={testDescription}
          backgroundImage={getImage('product-referral.png')}
        />
        <ProductCard
          title="Mobile Apps"
          description={testDescription}
          backgroundImage={getImage('product-mobile-apps.png')}
        />
      </Row>
    </Slider>
  );
}

export default ProductCards;
