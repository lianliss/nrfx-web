import React from 'react';
import router from 'src/router';
import _ from 'lodash';
import { Web3Context } from 'services/web3Provider';

// Components
import { Row, Button, Col } from 'src/ui';
import SVG from 'utils/svg-wrap';
import Lang from 'src/components/Lang/Lang';

// Styles
import './DepositTransfer.less';

function DepositTransfer({ onClose, adaptive }) {
  const context = React.useContext(Web3Context);
  const { chainId, accountAddress, addTokenToWallet, fiats } = context;
  const routerState = router.getState();
  const currency = _.get(routerState, 'params.currency', 'RUB').toUpperCase();

  const userId = `${chainId}${accountAddress}`;
  const fiatTokens = _.get(fiats, userId, [
    {
      name: 'Russian Ruble on Narfex',
      symbol: 'RUB',
      address: '0xa4FF4DBb11F3186a1e96d3e8DD232E31159Ded9B',
      logoURI: 'https://static.narfex.com/img/currencies/rubles.svg',
    },
  ]);
  const fiat = fiatTokens.find((f) => f.symbol === currency);

  return (
    <Col className="DepositModal__Bank__DepositTransfer" alignItems="center">
      <h3 className="blue large-height">
        <Lang name="fiatRefillCard_status_wait_for_review" />
      </h3>
      <p className="DepositModal__Bank__DepositTransfer-subtitle">
        Your tokens will be credited directly to your connected wallet. Import
        the token into your wallet using the button below.
      </p>
      <div className="speed-icon">
        <SVG src={require('src/asset/icons/transaction/speed.svg')} />
      </div>
      <p className="medium-weight blue large-height small">
        <em>
          <Lang name="fiatRefillCard_status_description_wait_for_review" />
        </em>
      </p>
      <Row className="buttons" justifyContent="center" wrap={adaptive}>
        <Button
          type="secondary-alice"
          shadow
          onClick={() => addTokenToWallet(fiat)}
        >
          Add to Metamask
          <SVG src={require('src/asset/icons/social/metaMask.svg')} />
        </Button>
        <Button type="lightBlue" shadow onClick={onClose}>
          <Lang name="global_ok" />
        </Button>
      </Row>
    </Col>
  );
}

export default DepositTransfer;
