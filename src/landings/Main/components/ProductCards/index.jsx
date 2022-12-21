import React from 'react';

// Components
import { Row } from 'ui';
import Slider from 'dapp/ui/Slider/Slider';
import ProductCard from '../ProductCard';
import SVG from 'utils/svg-wrap';

// Utils
import useIsInViewport from 'src/hooks/useIsInViewport';
import productCards from '../../constants/productCards';
import { classNames as cn } from 'utils';

// Styles
import './index.less';

function ProductCards({ adaptive, prevSlideRef, nextSlideRef }) {
  const sliderContainerRef = React.useRef(null);
  const { visible } = useIsInViewport(sliderContainerRef);
  const testDescription =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
  const [displayedCards, setDisplayedCards] = React.useState([]);

  React.useEffect(() => {
    if (!visible) return;

    const productCardsInterval = setInterval(() => {
      setDisplayedCards((prev) => {
        const nextCard = [...productCards].reverse()[prev.length];

        if (!nextCard) {
          clearInterval(productCardsInterval);
          return prev;
        }

        return [nextCard, ...prev];
      });
    }, 500);
  }, [visible]);

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
        {displayedCards.map((product, index) => (
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
            adaptive={adaptive}
            style={{
              zIndex: index + -index * 2 + displayedCards.length,
            }}
          />
        ))}
      </div>
    </Slider>
  );
}

export default ProductCards;
