import React from 'react';
import PropTypes from 'prop-types';

// Components
import CabinetTable, { TR, TD } from 'dapp/CabinetTable/CabinetTable';
import { Row, NumberFormat, Button } from 'ui';
import { WalletIcon } from 'dapp';
import SVG from 'utils/svg-wrap';
import PaymentItem from 'src/index/components/p2p/components/PaymentItem';

// Utils
import avatar from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';
import getFinePrice from 'utils/get-fine-price';
import paymentColors from '../../../constants/paymentColors';
import { p2pMode } from 'src/index/constants/dapp/types';

// Styles
import './index.less';

function AdaptiveList({
                        mode,
                        selectedPayment,
                        selectedFiat,
                        amount,
                        offersList,
                        onOrderCreate,
                        banksList,
                      }) {
  const Item = ({offer}) => {
    const {
      address,
      commission,
      currency,
      isKYCRequired,
      maxTrade,
      minTrade,
      name,
      network,
      owner,
      schedule,
      settings,
      side,
    } = offer;
    const banks = _.get(settings, 'banks', [])
      .filter(b => !!b.code)
      .map(b => _.get(banksList.find(l => l.code === b.code), 'title'));
    return <TR className="orders-list-item">
      <TD>
        <div className="orders-list-user">
          <div className="orders-list-user__profile">
            <img src={avatar} alt="" className="orders-list-user__avatar" />
            <span
              className="orders-list-user__name "
              title={address}
            >
              {name.length ? name : address}
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
          <WalletIcon currency={selectedFiat.symbol} size={24} />
          <NumberFormat number={commission * 100} currency="%" />
        </Row>
      </TD>
      <TD>
        <div className="orders-list-limits">
          <div className="orders-list-limits__available">
            <span className="orders-list-limits__title">Min. trade</span>
            <NumberFormat number={minTrade} currency={selectedFiat.symbol} />
          </div>
          <div className="orders-list-limits__available">
            <span className="orders-list-limits__title">Max. trade</span>
            <NumberFormat number={maxTrade} currency={selectedFiat.symbol} />
          </div>
        </div>
      </TD>
      <TD>
        <div className="orders-list-buy">
          <Button
            type={mode === p2pMode.sell ? 'orange' : 'lightBlue'}
            size="small"
            onClick={() => {
              onOrderCreate(offer, banksList)
            }}
          >
            {mode === p2pMode.sell ? 'Sell' : 'Buy'}
          </Button>
        </div>
      </TD>
      <TD>
        <div className="orders-list-payment">
          {banks.map((bank, index) => <PaymentItem title={bank} key={index} color={paymentColors.orange} />)}
        </div>
      </TD>
    </TR>
  };

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
        {offersList.map((offer, index) => <Item offer={offer} key={index} />)}
      </CabinetTable>
    </div>
  );
}

AdaptiveList.propTypes = {
  mode: PropTypes.oneOf(p2pMode),
};

export default AdaptiveList;
