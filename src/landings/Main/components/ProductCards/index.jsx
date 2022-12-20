import React from 'react';

// Components
import { Row } from 'ui';
import Slider from 'dapp/ui/Slider/Slider';
import ProductCard from '../ProductCard';
import SVG from 'utils/svg-wrap';

// Utils
import useIsInViewport from 'src/hooks/useIsInViewport';
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function ProductCards({ adaptive, prevSlideRef, nextSlideRef }) {
  const sliderContainerRef = React.useRef(null);
  const { visible } = useIsInViewport(sliderContainerRef);
  const testDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

  const getImage = (fileName) =>
    require(`src/asset/backgrounds/main-landing/${fileName}`);

  return (
    <Slider
      className="MainLanding-ProductCards"
      prevSlideRef={prevSlideRef}
      nextSlideRef={nextSlideRef}
      stepSize={adaptive ? 315 : 521}
      adaptive={adaptive}
    >
      <div
        className={cn('MainLanding-ProductCards__slider', { visible })}
        ref={sliderContainerRef}
      >
        <ProductCard
          title="Dex & Liquidity"
          description={testDescription}
          backgroundImage={getImage('product-dex.png')}
          statistics={
            <ProductCard.Statistics
              title="475,678"
              subtitle="transaction"
              icon={<SVG src={require('src/asset/24px/track_changes.svg')} />}
            />
          }
          adaptive={adaptive}
        />
        <ProductCard
          title="NRFX Token"
          description={testDescription}
          backgroundImage={getImage('product-token.png')}
          statistics={
            <ProductCard.Statistics
              title="$0.434"
              subtitle="price"
              icon={<SVG src={require('src/asset/24px/monetization_on.svg')} />}
            />
          }
          adaptive={adaptive}
        />
        <ProductCard
          title="Farming"
          description={testDescription}
          backgroundImage={getImage('product-farming.png')}
          adaptive={adaptive}
        />
        <ProductCard
          title="Validator"
          description={testDescription}
          backgroundImage={getImage('product-validator.png')}
          adaptive={adaptive}
        />
        <ProductCard
          title="Wallet"
          description={testDescription}
          backgroundImage={getImage('product-wallet.png')}
          adaptive={adaptive}
        />
        <ProductCard
          title="Referral Program"
          description={testDescription}
          backgroundImage={getImage('product-referral.png')}
          statistics={
            <ProductCard.Statistics
              title="75 678"
              subtitle="users love"
              icon={<SVG src={require('src/asset/24px/favorite.svg')} />}
            />
          }
          adaptive={adaptive}
        />
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
        />
      </div>
    </Slider>
  );
}

export default ProductCards;
