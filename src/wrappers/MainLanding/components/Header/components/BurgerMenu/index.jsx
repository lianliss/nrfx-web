import React from 'react';

// Components
import { CustomButton } from 'dapp';

// Styles
import './index.less';

function BurgerMenu({ onClick }) {
  return (
    <CustomButton className="burger-menu" onClick={onClick}>
      <span />
    </CustomButton>
  );
}

export default BurgerMenu;
