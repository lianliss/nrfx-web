import React from 'react';
import PropTypes from 'prop-types';

// Components
import CustomButton from 'dapp/ui/CustomButton/CustomButton';
import SVG from 'utils/svg-wrap';

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
}) {
  return (
    <div className="MainLanding-ProductCard">
      <div className="MainLanding-ProductCard__content">
        <h4>{title}</h4>
        <p>{description}</p>
        <CustomButton disabled={comingSoon}>
          {comingSoon ? (
            'Coming Soon'
          ) : (
            <>
              Try now
              <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
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

ProductCard.propTypes = {
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
          {subtitle}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
