import React from 'react';

import { Button } from 'ui';

const BuyButton = ({ onClick }) => (
  <Button size="extra_small" type="lightBlue" onClick={onClick}>
    <span>Buy USDT</span>
  </Button>
);

export default BuyButton;
