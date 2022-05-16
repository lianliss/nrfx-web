import React from 'react';

// Components
import { Range } from 'src/ui';
import { Button } from 'src/ui';

// Styles
import './LiquidityRange.less';

// Main
function LiquidityRange() {
  const [value, setValue] = React.useState(75);

  // Handlers
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="LiquidityRange">
      <span className="default-text-light">Amount</span>
      <div>
        <span className="LiquidityRange__amount">{value}%</span>
      </div>
      <Range
        min={0}
        max={100}
        onChange={handleChange}
        value={value}
        skipLabel
        type="light-blue"
      />
      <div className="LiquidityRange__buttons">
        <Button type="secondary" onClick={() => setValue(25)}>
          25%
        </Button>
        <Button type="secondary" onClick={() => setValue(50)}>
          50%
        </Button>
        <Button type="secondary" onClick={() => setValue(75)}>
          75%
        </Button>
        <Button type="secondary" onClick={() => setValue(100)}>
          Max
        </Button>
      </div>
    </div>
  );
}

export default LiquidityRange;
