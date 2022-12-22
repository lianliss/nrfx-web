import React from 'react';

// Components
import Slider from 'dapp/ui/Slider/Slider';
import ProductCard from '../ProductCard';
import SVG from 'utils/svg-wrap';

// Utils
import productCards from '../../constants/productCards';
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function ProductCards({
  adaptive,
  prevSlideRef,
  nextSlideRef,
  visible = true,
}) {
  const playCardAnimation = (index) => {
    if (adaptive) {
      return {};
    }

    const delay = index / 3;

    return {
      animation: `
        cardIsHidden ${delay}s,
        showCard 0.7s ${delay}s
      `,
    };
  };

  if (!visible) {
    return <div className="MainLanding-ProductCards__slider" />;
  }

  return (
    <Slider
      className="MainLanding-ProductCards"
      prevSlideRef={prevSlideRef}
      nextSlideRef={nextSlideRef}
      stepSize={adaptive ? 315 : 521}
      adaptive={adaptive}
    >
      <div className={cn('MainLanding-ProductCards__slider')}>
        {productCards.map((product, index) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            backgroundImage={product.backgroundImage}
            dark={product.dark}
            statistics={
              product.statistics && (
                <ProductCard.Statistics
                  title={product.statistics.title}
                  subtitle={product.statistics.subtitle}
                  icon={<SVG src={product.statistics.icon} />}
                />
              )
            }
            comingSoon={product.comingSoon}
            style={playCardAnimation(index)}
            adaptive={adaptive}
          />
        ))}
      </div>
    </Slider>
  );
}

export default ProductCards;
