import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QRCode from 'react-qr-code';

import { Modal, CopyText, Button } from 'src/ui';
import SVG from 'utils/svg-wrap';
import maximizeIcon from 'src/ui/components/CopyText/assets/maximize.svg';
import './ReceiveQRModal.less';
import { web3WalletsSelector } from 'src/selectors';
import BottomSheetModal from '../../../../ui/components/BottomSheetModal/BottomSheetModal';

function ReceiveQRModal({ web3Wallets, onClose, adaptive }) {
  const wallet = web3Wallets[0];
  const { address } = wallet;

  return (
    <>
      {adaptive ? (
        <BottomSheetModal onClose={onClose}>
          <div className="ReceiveQRModal">
            <h3 className="ReceiveQRModal__title">Receive</h3>
            <QRCode value={address} size={250} />
            <p className="ReceiveQRModal__subtitle">
              Scan address to receive payment
            </p>
            <div className="ReceiveQRModal__CopyText-container">
              <CopyText text={address} className="ReceiveQRModal__CopyText" />
              <SVG src={maximizeIcon} />
            </div>
          </div>
        </BottomSheetModal>
      ) : (
        <Modal onClose={onClose} className="ReceiveQRModal-container">
          {address && (
            <div className="ReceiveQRModal">
              <h3 className="ReceiveQRModal__title">Receive</h3>
              <QRCode value={address} size={250} />
              <p className="ReceiveQRModal__subtitle">
                Scan address to receive payment
              </p>
              <div className="ReceiveQRModal__CopyText-container">
                <CopyText text={address} className="ReceiveQRModal__CopyText" />
                <SVG src={maximizeIcon} />
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
}

ReceiveQRModal.propTypes = {
  web3Wallets: PropTypes.array,
  onClose: PropTypes.func,
  adaptive: PropTypes.bool,
};

ReceiveQRModal.defaultProps = {
  web3Wallets: [],
  onClose: () => {},
  adaptive: false,
};

export default connect((state) => ({
  route: state.router.route,
  swapCurrencies: {
    from: state.wallet.swap.fromCurrency,
    to: state.wallet.swap.toCurrency,
  },
  web3Wallets: web3WalletsSelector(state),
}))(ReceiveQRModal);
