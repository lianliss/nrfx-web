import React from 'react';

import { Row, NumberFormat } from 'ui';
import { LimitAndAvailable, BuyButton, SellButton, Payment } from '..';
import { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { WalletIcon } from 'dapp';
import { p2pMode } from 'src/index/constants/dapp/types';

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
        {props.mode === p2pMode.buy && <BuyButton onClick={props.onTrade} />}
        {props.mode === p2pMode.sell && <SellButton onClick={props.onTrade} />}
      </Row>
    </TD>
    <TD>{props.payment && <Payment payment={props.payment} />}</TD>
  </TR>
);

export default MobileTR;
