import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import _ from 'lodash';
import getFinePrice from 'utils/get-fine-price';

// All popups for Farming
// is here.

// Import Components
import Popup from 'src/index/components/dapp/Popup/Popup';
import {
  NumberFormat,
  Form,
  Button,
  Input,
  Modal,
  Table,
  TableCell,
  TableColumn,
  BottomSheetModal,
} from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import popupTimer from 'src/index/components/dapp/Popup/hooks/popupTimer';
import { toastPush } from 'src/actions/toasts';

// Styles
import './FarmingPopup.less';

// Main Components
// Popup
export function FarmingPopup({ message, onClose, pool, ...props }) {
  const [isHover, setIsHover] = React.useState(false);
  const isDisabled = popupTimer(isHover, onClose);

  return (
    <Popup
      className={`FarmingPopup ${isDisabled ? 'disabled' : ''}`}
      onClose={onClose}
      onMouseOver={() => {
        props.onMouseOver();
        setIsHover(true);
      }}
      onMouseLeave={() => {
        props.onMouseLeave();
        setIsHover(false);
      }}
    >
      <div className="FarmingPopup__header">
        <div className="success-title">
          <SVG src={require('src/asset/icons/cabinet/success-icon.svg')} />
          <span>{message}</span>
        </div>
      </div>
      <PopupLink text="Wiew on scan" />
    </Popup>
  );
}

FarmingPopup.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func,
};

FarmingPopup.defaultProps = {
  message: '',
  onClose: () => {},
};
// Popup end.

// ROI Modal.
export function FarmingPopupROI(props) {
  const adaptive = useSelector((state) => state.default.adaptive);
  const Wrapper = adaptive ? BottomSheetModal : Modal;
  const {pool} = props;
  if (!pool) {
    props.onClose();
    return <></>;
  };
  const rewardPrice = useSelector(state => _.get(state, 'web3.rates.nrfx', 0));
  const {blocksPerSecond, prices} = React.useContext(Web3Context);
  const pairPrice = prices[pool.address] || 1;
  const poolSize = wei.from(_.get(pool, 'size', '0')) || (1000 / pairPrice);
  const poolPrice = pairPrice * poolSize;
  const userPool = wei.from(_.get(pool, 'userPool', '0')) || (1000 / pairPrice);
  const userShare = userPool / poolSize;
  const rewardPerBlock = wei.from(_.get(pool, 'rewardPerBlock', '0'));

  const periods = [
    {title: 'Day', time: 60 * 60 * 24},
    {title: 'Week', time: 60 * 60 * 24 * 7},
    {title: 'Month', time: 60 * 60 * 24 * 30},
    {title: 'Year', time: 60 * 60 * 24 * 365},
  ];

  return (
    <Wrapper
      className="FarmingPopup FarmingPopup__fullscreen"
      {...props}
      skipClose
    >
      <div className="close" onClick={props.onClose}>
        <SVG src={require('src/asset/icons/close-popup.svg')} />
      </div>
      <div className="FarmingPopup__header">
        <div className="title">
          <span>ROI</span>
        </div>
        <p>
          Calculated based on current rates. Rates are estimates provided for
          your convenience only, and by no means represent guaranteed returns.
        </p>
      </div>
      <div className="FarmingPopup__body">
        <Table
          headings={[
            <TableColumn sub="Timeframe" />,
            <TableColumn sub="ROI" />,
            <TableColumn sub={`Per $${getFinePrice(userPool * pairPrice)}`} />,
          ]}
          className="FarmingPopup__table"
        >
          {periods.map((period, index) => {
            const periodReward = period.time * blocksPerSecond * rewardPerBlock * userShare;
            const periodRewardPrice = periodReward * rewardPrice;
            const apr = periodRewardPrice / (userPool * pairPrice);

            return <TableCell key={index}>
              <TableColumn>{period.title}</TableColumn>
              <TableColumn>
                <NumberFormat number={apr * 100} percent />
              </TableColumn>
              <TableColumn
                sub={
                  <>
                  $<NumberFormat number={periodRewardPrice.toFixed(0)} />
                  </>
                }
              >
                <NumberFormat number={periodReward.toFixed(0)} />
              </TableColumn>
            </TableCell>
          })}
        </Table>
      </div>
    </Wrapper>
  );
}
// ROI end.

// PopupLink
function PopupLink({ text, onClick }) {
  return (
    <span className="popup-link" onClick={onClick}>
      {text} <SVG src={require('src/asset/icons/export.svg')} />
    </span>
  );
}

PopupLink.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

PopupLink.defaultProps = {
  text: '',
  onClick: () => {},
};
