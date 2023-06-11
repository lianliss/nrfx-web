import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import wait from 'utils/wait';
import _ from 'lodash';

// Components
import { CabinetModal } from 'dapp';
import { Row } from 'ui';
import { UserOrdersInfo } from 'src/index/components/p2p';
import {
  Form,
  TermsAndConditions,
  OrderAmountItems,
  PaymentItems,
} from './components';

// Utils
import { adaptiveSelector, dappP2PPaymentSelector } from 'src/selectors';
import { p2pMode } from 'src/index/constants/dapp/types';
import { closeStateModal } from 'src/actions';

// Styles
import './CreateOrder.less';

const Wrapper = ({ children, adaptive, ...props }) => (
  <CabinetModal
    className="p2p-modal-create-order__wrapper"
    closeOfRef={adaptive}
    closeButton={adaptive}
    {...props}
  >
    <Row
      className="p2p-modal-create-order"
      alignItems="stretch"
      wrap={adaptive}
    >
      {children}
    </Row>
  </CabinetModal>
);

const getTitle = (mode) => {
  if (mode === p2pMode.buy) {
    return 'Buy';
  }

  if (mode === p2pMode.sell) {
    return 'Sell';
  }
};

function CreateOrder({ mode, onClose, offer, banksList, payment, ...props }) {
  if (!mode || !offer) {
    onClose();
    return <></>;
  }
  
  const {
    fiat,
    address,
    commission,
    currency,
    isKYCRequired,
    maxTrade,
    minTrade,
    name,
    owner,
    schedule,
    settings,
    side,
  } = offer;
  const banks = _.get(settings, 'banks', [])
    .map((b, index) => {
      if (typeof b === 'string' && b.length) {
        const title = _.get(banksList.find(l => l.code === b), 'title', b);
        return {
          code: b,
          title,
          index,
        }
      }
      if (!b.code) {
        return null;
      }
      const title = b.bankName || _.get(banksList.find(l => l.code === b.code), 'title', b.code);
      return {
        ...b,
        title,
        index,
      }
    });
  const terms = _.get(settings, 'terms', '');

  const adaptive = useSelector(adaptiveSelector);
  const selectedPayment = payment;
  console.log('selectedPayment', selectedPayment);

  return (
    <Wrapper adaptive={adaptive} onClose={closeStateModal} {...props}>
      <div>
        {adaptive && <h2>{getTitle(mode)} {fiat.symbol}</h2>}
        <UserOrdersInfo
          name={name}
          ordersNumber={287}
          completion={85.7}
        />
        <OrderAmountItems maxTrade={maxTrade} fiat={fiat} commission={commission} mode={mode} />
        {!adaptive && (
          <PaymentItems
            banks={banks}
            selected={selectedPayment}
            mode={mode}
            adaptive={adaptive}
          />
        )}
        {!adaptive && (
          <TermsAndConditions terms={terms} mode={mode} />
        )}
      </div>
      <Form
        mode={mode}
        adaptive={adaptive}
        selectedPayment={selectedPayment}
        onCancel={closeStateModal}
        banks={banks}
        banksList={banksList}
        offer={offer}
        {...props}
      />
    </Wrapper>
  );
}

CreateOrder.propTypes = {
  mode: PropTypes.oneOf(Object.values(p2pMode)),
};

export default CreateOrder;
