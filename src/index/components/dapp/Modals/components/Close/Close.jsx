import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import CustomButton from '../../../ui/CustomButton/CustomButton';

// Styles
import './Close.less';

function Close({ onClose, top, right }) {
  return (
    <CustomButton
      className="DappModal__Close"
      style={{ top, right }}
      onClick={onClose}
    >
      <SVG
        src={require('src/asset/icons/close/default.svg')}
        className="default"
      />
    </CustomButton>
  );
}

export default Close;
