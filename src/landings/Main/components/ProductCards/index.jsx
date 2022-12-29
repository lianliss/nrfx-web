import React from 'react';
import PropTypes from 'prop-types';

// Components
import Slider from 'dapp/ui/Slider/Slider';
import ProductCard from '../ProductCard';
import SVG from 'utils/svg-wrap';

// Utils
import productCards from '../../constants/productCards';
import { classNames as cn } from 'utils';
import web3Backend from 'src/services/web3-backend';
import _ from 'lodash';

// Styles
import './index.less';

function ProductCards({ adaptive, prevSlideRef, nextSlideRef, visible }) {
  const [nrfxPrice, setNrfxPrice] = React.useState(0);
  const playCardAnimation = (index) => {
    if (adaptive) {
      return {};
    }

    const delay = index / 3;

    return {
      animation: `
        productCardIsHidden ${delay}s,
        showProductCard 0.7s ${delay}s
      `,
    };
  };

  React.useEffect(() => {
    web3Backend.getTokenRate('nrfx').then((data) => {
      const price = data.price;

      if (_.isFunction(price.toFixed)) {
        setNrfxPrice(price.toFixed(2));
      }
    });
  }, []);

  if (!visible && !adaptive) {
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
            routeName={product.routeName || ''}
            statistics={
              product.statistics && (
                <ProductCard.Statistics
                  title={
                    product.statistics.title === 'nrfxPrice'
                      ? nrfxPrice
                      : product.statistics.title
                  }
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

ProductCards.propTypes = {
  adaptive: PropTypes.bool,
  visible: PropTypes.bool,
};

ProductCards.defaultProps = {
  adaptive: false,
  visible: true,
};

// refProp: PropTypes.oneOfType([
//   // Either a function
//   PropTypes.func,
//   // Or the instance of a DOM native element (see the note about SSR)
//   PropTypes.shape({ current: PropTypes.instanceOf(Element) })
// ])

export default ProductCards;
