import React from 'react';
import PropTypes from 'prop-types';

// Components
import CustomButton from 'dapp/ui/CustomButton/CustomButton';
import SVG from 'utils/svg-wrap';

// Utils
import { classNames as cn, getLang } from 'utils';

// Styles
import './index.less';

function ProductCard({
  title,
  description,
  onClick,
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
        <CustomButton disabled={comingSoon}>
          {comingSoon ? (
            getLang('global_comingSoon')
          ) : (
            <>
              {getLang('main_landing_product_try_now')}
              <SVG src={require('src/asset/24px/arrow_right_alt.svg')} />
            </>
          )}
        </CustomButton>
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
        <div className="MainLanding-ProductCard-statistics__title">{title}</div>
        <div className="MainLanding-ProductCard-statistics__subtitle">
          {getLang(subtitle)}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
