import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router5';

// Components
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn, getLang } from 'utils';
import getFinePrice from 'utils/get-fine-price';
import _ from 'lodash';

// Styles
import './index.less';

function ProductCard({
  title,
  description,
  routeName,
  backgroundImage,
  statistics,
  comingSoon,
  adaptive,
  dark,
  ...otherProps
}) {
  return (
    <div className={cn('MainLanding-ProductCard', { dark })} {...otherProps}>
      <div className="MainLanding-ProductCard__content">
        <h4>{getLang(title)}</h4>
        <p>{getLang(description)}</p>
        <div className="MainLanding-ProductCard-link__wrapper">
          <Link className={cn({ disabled: comingSoon })} routeName={routeName}>
            {comingSoon ? (
              getLang('global_comingSoon')
            ) : (
              <>
                {getLang('main_landing_product_try_now')}
                <SVG src={require('src/asset/24px/arrow_right_alt.svg')} />
              </>
            )}
          </Link>
        </div>
      </div>
      {backgroundImage && (
        <div className="MainLanding-ProductCard__background">
          <img src={backgroundImage} />
        </div>
      )}
      {!adaptive && statistics}
    </div>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onClick: PropTypes.func,
  backgroundImage: PropTypes.string,
  statistics: PropTypes.node,
  comingSoon: PropTypes.bool,
  adaptive: PropTypes.bool,
};

ProductCard.defaultProps = {
  title: '',
  description: '',
  onClick: () => {},
  backgroundImage: '',
  statistics: null,
  comingSoon: false,
  adaptive: false,
};

ProductCard.Statistics = ({ title, subtitle, icon }) => {
  return (
    <div className="MainLanding-ProductCard-statistics">
      <div className="MainLanding-ProductCard-statistics__icon">{icon}</div>
      <div className="MainLanding-ProductCard-statistics__content">
        <div className="MainLanding-ProductCard-statistics__title">
          {_.isString(title) ? getLang(title) : getFinePrice(title)}
        </div>
        <div className="MainLanding-ProductCard-statistics__subtitle">
          {getLang(subtitle)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
