import React from 'react';

import { Row, NumberFormat } from 'ui';
import { LimitAndAvailable, BuyButton, Payment } from '..';
import { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { WalletIcon } from 'dapp';

const MobileTR = (props) => (
  <TR>
    <TD>
      <span>{props.coin?.symbol.toUpperCase()}</span>
    </TD>
    <TD>
      <Row alignItems="center" gap={8}>
        <WalletIcon currency={props.coin} size={24} />
        <NumberFormat number={props.price} currency={props.coin.symbol} />
      </Row>
      <Row justifyContent="space-between" alignItems="flex-end">
        <LimitAndAvailable
          available={props.available}
          limits={props.limits}
          selectedCoin={props.selectedCoin}
        />
        <BuyButton onClick={props.onTrade} />
      </Row>
    </TD>
    <TD>{props.payment && <Payment payment={props.payment} />}</TD>
  </TR>
);

export default MobileTR;
