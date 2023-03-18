import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { Row, NumberFormat, Button } from 'ui';
import ListPayment from '../ListPayment';
import { WalletIcon } from 'dapp';
import SVG from 'utils/svg-wrap';

// Utils
import avatar from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';
import getFinePrice from 'utils/get-fine-price';
import paymentColors from '../../../constants/paymentColors';
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './index.less';

function AdaptiveList({ mode }) {
  const Item = () => (
    <TR className="orders-list-item">
      <TD>
        <div className="orders-list-user">
          <div className="orders-list-user__profile">
            <img src={avatar} alt="" className="orders-list-user__avatar" />
            <span
              className="orders-list-user__name "
              title="mail****@gmail.com"
            >
              mail****@gmail.com
            </span>
            <SVG src={require('src/asset/icons/status/sucess-13px.svg')} flex />
          </div>
          <div className="orders-list-user__info">
            <span>
              <NumberFormat number={287} /> orders
            </span>
            <span>
              <NumberFormat number={85.7} percent /> completion
            </span>
          </div>
        </div>
      </TD>
      <TD>
        <Row alignItems="center" className="orders-list-price">
          <WalletIcon currency="IDR" size={24} />
          <NumberFormat number={15333.33} currency="IDR" />
        </Row>
      </TD>
      <TD>
        <div className="orders-list-limits">
          <div className="orders-list-limits__available">
            <span className="orders-list-limits__title">Available</span>
            <NumberFormat number={1000.0} currency="N-Fiat" />
          </div>
          <div className="orders-list-limits__limit">
            <span className="orders-list-limits__title">Limit</span>
            <div>
              <span className="Number" title={1000000.0}>
                {`Rp${getFinePrice(1000000.0)}`}
              </span>
              <span className="Number">&nbsp;-&nbsp;</span>
              <span className="Number" title={1030260.0}>
                {`Rp${getFinePrice(1030260.0)}`}
              </span>
            </div>
          </div>
        </div>
      </TD>
      <TD>
        <div className="orders-list-buy">
          <Button
            type={mode === p2pMode.sell ? 'orange' : 'lightBlue'}
            size="small"
          >
            {mode === p2pMode.sell ? 'Sell' : 'Buy'}
          </Button>
        </div>
      </TD>
      <TD>
        <div className="orders-list-payment">
          <ListPayment
            title="Bank Transfer"
            color={paymentColors.orange}
            adaptive
          />
          <ListPayment title="Pay me" color={paymentColors.red} adaptive />
          <ListPayment title="Mono Bank" color={paymentColors.black} adaptive />
          <ListPayment
            title="Bank Transfer"
            color={paymentColors.orange}
            adaptive
          />
          <ListPayment title="Pay me" color={paymentColors.red} adaptive />
        </div>
      </TD>
    </TR>
  );

  return (
    <div className="orders-list">
      <CabinetTable
        header={
          <TR>
            <TD>Advertisers (Completion rate)</TD>
            <TD>Price</TD>
            <TD>Limit/Available</TD>
            <TD>Payment</TD>
            <TD>
              Trade <span className="green">0 Fee</span>
            </TD>
          </TR>
        }
      >
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </CabinetTable>
    </div>
  );
}

AdaptiveList.propTypes = {
  mode: PropTypes.oneOf(p2pMode),
};

export default AdaptiveList;
