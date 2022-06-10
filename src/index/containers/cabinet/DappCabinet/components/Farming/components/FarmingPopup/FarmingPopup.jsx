import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';

// All popups for Farming
// is here.

// Import Components
import Popup from 'src/index/components/cabinet/Popup/Popup';
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
import popupTimer from 'src/index/components/cabinet/Popup/hooks/popupTimer';
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
            <TableColumn sub="Per $1 000" />,
          ]}
          className="FarmingPopup__table"
        >
          {/*item start*/}
          <TableCell>
            <TableColumn>1d.</TableColumn>
            <TableColumn>
              <NumberFormat number={0.2} percent />
            </TableColumn>
            <TableColumn
              sub={
                <>
                  $<NumberFormat number={2.05} />
                </>
              }
            >
              <NumberFormat number={1.85} />
            </TableColumn>
          </TableCell>
          {/*item end*/}
          <TableCell>
            <TableColumn>1d.</TableColumn>
            <TableColumn>
              <NumberFormat number={0.2} percent />
            </TableColumn>
            <TableColumn
              sub={
                <>
                  $<NumberFormat number={2.05} />
                </>
              }
            >
              <NumberFormat number={1.85} />
            </TableColumn>
          </TableCell>
          <TableCell>
            <TableColumn>1d.</TableColumn>
            <TableColumn>
              <NumberFormat number={0.2} percent />
            </TableColumn>
            <TableColumn
              sub={
                <>
                  $<NumberFormat number={2.05} />
                </>
              }
            >
              <NumberFormat number={1.85} />
            </TableColumn>
          </TableCell>
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
