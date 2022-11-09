import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import QRScannerModal from 'src/index/components/dapp/QRScannerModal/QRScannerModal';
import CabinetModal from 'src/index/components/dapp/Modals/CabinetModal/CabinetModal';
import * as UI from 'ui';
import Close from '../components/Close/Close';

// Utils
import { Web3Context } from 'src/services/web3Provider';
import SVG from 'utils/svg-wrap';
import { getLang } from 'utils';
import * as toastsActions from 'src/actions/toasts';
import wei from 'utils/wei';
import _ from 'lodash';

import './SendTokens.less';

function SendTokens({ onClose, token }) {
  // Constants
  const dispatch = useDispatch();
  const adaptive = useSelector((state) => state.default.adaptive);
  const { sendTokens, balances } = React.useContext(Web3Context);

  // States
  const [isLoading, setIsLoading] = React.useState(false);
  const [isQRModal, setIsQRModal] = React.useState(false);
  const [address, setAddress] = React.useState('');
  const [amount, setAmount] = React.useState(null);

  if (_.isEmpty(token)) {
    onClose();
    return null;
  }

  // Filtered data
  const balancesToken =
    balances.tokens.find(
      (balanceToken) =>
        balanceToken.symbol.toLowerCase() === token.symbol.toLowerCase()
    ) || {};
  const balance = wei.from(balancesToken.balance) || 0;

  // Functions
  const toastPush = (text, type) => {
    dispatch(toastsActions.toastPush(text, type));
  };

  const transfer = async () => {
    if (!amount || !address) {
      toastPush(getLang('toast_transaction_declined'), 'error');
      return;
    }

    setIsLoading(true);

    const sendResult = await sendTokens(token, address, amount);

    if (sendResult) {
      toastPush(getLang('cabinet_sendCoinsModal_success'), 'success');
    } else {
      toastPush(getLang('toast_transaction_declined'), 'error');
    }

    setIsLoading(false);
  };

  // Components
  const renderLoading = () => {
    return (
      <div className="SendTokens-loading">
        <SVG src={require(`src/asset/cabinet/loading_34.svg`)} />
        <div className="SendTokens-loading-text">
          {getLang('cabinetWalletTransfer_loading')}
        </div>
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="SendTokens-form">
        <form onSubmit={transfer}>
          <h3>{getLang('cabinetWalletTransfer_address')}</h3>
          <div className="SendTokens__address">
            <UI.Input
              value={address}
              onChange={(event) => setAddress(event.currentTarget.value)}
            />
            <SVG
              src={require('src/asset/icons/action/qrIcon.svg')}
              className="SendTokens__address-icon"
              onClick={() => setIsQRModal(true)}
            />
          </div>
          <h3>
            <span>{getLang('cabinetWalletTransfer_amount')}</span>
            <span
              className="active"
              onClick={() => setAmount(Number(balance.toFixed(5)))}
            >
              <UI.NumberFormat
                number={Number(balance.toFixed(5))}
                currency={token.symbol}
              />
            </span>
          </h3>
          <UI.Input
            value={amount}
            type="number"
            onChange={(event) => setAmount(Number(event.currentTarget.value))}
          />
        </form>
        <UI.Button
          onClick={transfer}
          type="lightBlue"
          size="extra_large"
          disabled={!amount || !address}
        >
          <SVG src={require('src/asset/icons/cabinet/wallet-with-coin.svg')} />
          {getLang('global_send')}
        </UI.Button>
      </div>
    );
  };

  return (
    <>
      <CabinetModal
        isOpen={true}
        onClose={onClose}
        className="SendTokens"
        closeOfRef={!isQRModal}
      >
        <h3>
          {getLang('cabinetWalletTransfer_header')} {token.symbol.toUpperCase()}
        </h3>
        <div className="SendTokens-content">
          {isLoading ? renderLoading() : renderForm()}
        </div>
        <Close onClose={onClose} />
      </CabinetModal>
      {isQRModal && (
        <QRScannerModal
          adaptive={adaptive}
          onResult={(result) => {
            const filteredResult = result.replace(/(^ethereum\:|@56$)/g, '');

            setAddress(filteredResult);
          }}
          onClose={() => setIsQRModal(false)}
          toastPush={toastPush}
        />
      )}
    </>
  );
}

export default SendTokens;
