import React from 'react';

// Components
import Select, { option } from 'src/index/components/dapp/Select/Select';
import { Input, Row, Button } from 'src/ui';
import DepositModal from '../../DepositModal';

// Styles
import './Balance.less';

const options = [
  option(
    'Indonesian Rupiah',
    'IDR',
    require('src/asset/icons/wallets/idr.svg'),
    true
  ),
  option(
    'Russian Ruble',
    'RUB',
    require('src/asset/icons/wallets/rub.svg'),
    true
  ),
  option(
    'Ukrainian Hryvnia',
    'UAH',
    require('src/asset/icons/wallets/rub.svg'),
    true
  ),
];

function Balance(props) {
  const [selected, setSelected] = React.useState(null);
  const [value, setValue] = React.useState(null);

  const handleInput = (value) => {
    if (value > Number.MAX_SAFE_INTEGER) {
      setValue(0);
      return;
    }

    setValue(Number(value.toFixed(5)));
  };

  React.useEffect(() => {
    setSelected(options[0].value);
  }, []);

  return (
    <DepositModal className="DepositModal__Balance" {...props}>
      <h3>Balance Deposit</h3>
      <Select
        options={options}
        value={selected}
        onChange={setSelected}
        indicatorIcon={require('src/asset/icons/cabinet/swap/select-arrow.svg')}
      />
      <Input
        placeholder="0.00"
        value={value}
        onTextChange={(value) => handleInput(value)}
        indicator="Min 5 000 RUB"
        type="number"
      />
      <p className="secondary medium default hight">Fee: 2%</p>
      <p className="blue medium default hight">To be credited: 4 900 RUB</p>
      <Row className="DepositModal__Balance-buttons">
        <Button type="secondary-alice">Back</Button>
        <Button type="lightBlue">Next</Button>
      </Row>
    </DepositModal>
  );
}

export default Balance;
