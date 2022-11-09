import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Components
import { CopyText } from 'src/ui';
import SVG from 'utils/svg-wrap';
import CabinetModal from '../Modals/CabinetModal/CabinetModal';
import QRCode from 'react-qr-code';

// Utils
import { web3WalletsSelector } from 'src/selectors';
import { Web3Context } from 'src/services/web3Provider';
import copyIcon from 'src/asset/icons/action/copy.svg';
import { getLang } from 'src/utils';

// Styles
import './DappReceiveQRModal.less';

function DappReceiveQRModal({ web3Wallets, onClose }) {
  const { accountAddress } = React.useContext(Web3Context);
  const wallet = web3Wallets[0];
  const address = accountAddress || wallet?.address || '';

  return (
    <CabinetModal onClose={onClose} closeButton>
      <div className="DappReceiveQRModal">
        <h3 className="DappReceiveQRModal__title">
          {getLang('receive_qr_global')}
        </h3>
        <div className="DappReceiveQRModal__qr">
          <QRCode value={address} size={158} />
        </div>
        {/* <p className="DappReceiveQRModal__subtitle">
          {getLang('receive_qr_modal_subtitle')}
        </p> */}
        <div className="DappReceiveQRModal__CopyText-container">
          <CopyText text={address}>
            <span className="DappReceiveQRModal__CopyText">{address}</span>
            <SVG src={copyIcon} />
          </CopyText>
        </div>
      </div>
    </CabinetModal>
  );
}

DappReceiveQRModal.propTypes = {
  web3Wallets: PropTypes.array,
  onClose: PropTypes.func,
};

DappReceiveQRModal.defaultProps = {
  web3Wallets: [],
  onClose: () => {},
};

export default connect((state) => ({
  web3Wallets: web3WalletsSelector(state),
}))(DappReceiveQRModal);
