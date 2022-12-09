import React from 'react';

// Components
import CustomButton from 'dapp/ui/CustomButton/CustomButton';
import SVG from 'utils/svg-wrap';

// Styles
import './index.less';

function ProductCard({ title, description, onClick, backgroundImage }) {
  return (
    <div className="MainLanding-ProductCard">
      <div className="MainLanding-ProductCard__content">
        <h4>{title}</h4>
        <p>{description}</p>
        <CustomButton>
          Try now
          <SVG src={require('src/asset/icons/arrows/slider-arrow.svg')} />
        </CustomButton>
      </div>
      {backgroundImage && (
        <div className="MainLanding-ProductCard__background">
          <img src={backgroundImage} />
        </div>
      )}
    </div>
  );
}

export default ProductCard;
