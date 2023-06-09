import React from 'react';

import { Button } from 'ui';

const SellButton = ({ onClick }) => (
  <Button size="extra_small" type="orange" onClick={onClick}>
    <span>Sell USDT</span>
  </Button>
);

export default SellButton;
