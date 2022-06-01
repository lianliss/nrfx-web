import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

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
export function FarmingPopup({ message, onClose, ...props }) {
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

// Stake Modal - Can expand.
export function FarmingPopupStake({ id, currency, ...props }) {
  const dispatch = useDispatch();
  const adaptive = useSelector((state) => state.default.adaptive);
  const type = props.modal; // stake || unstake
  const Wrapper = adaptive ? BottomSheetModal : Modal;
  // States
  const [value, setValue] = React.useState(15);

  // Handlers
  // Just input handler
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (type === 'stake') {
      dispatch(
        toastPush(`Staked ${value} ${currency.toUpperCase()}`, 'farming')
      );
    }

    if (type === 'unstake') {
      dispatch(
        toastPush(`Unstaked ${value} ${currency.toUpperCase()}`, 'farming')
      );
    }

    props.onClose();
  };

  return (
    <Wrapper
      className="FarmingPopup FarmingPopup__fullscreen FarmingPopupStake"
      {...props}
      skipClose
    >
      <div className="close" onClick={props.onClose}>
        <SVG src={require('src/asset/icons/close-popup.svg')} />
      </div>
      <div className="FarmingPopup__header">
        <div className="title">
          <span>
            {type === 'stake' ? 'Stake' : 'Unstake'} {currency.toUpperCase()}
            &nbsp;Tokens
          </span>
        </div>
      </div>
      <Form className="FarmingPopup__body" onSubmit={handleSubmit}>
        <label>
          <div className="FarmingPopup__label">
            <span className="default-text">
              {type === 'stake' ? 'Stake' : 'Unstake'}
            </span>
            <span className="default-text">
              Balance: <NumberFormat number={0} />
            </span>
          </div>
          <div className="input-container">
            <Input type="number" value={value} onTextChange={handleChange} />
            <div className="input-controls">
              <p className="default-text">BNB-NRFX</p>
              <button
                type="button"
                className="input-controls__button"
                onClick={() => {}}
              >
                <span>Max</span>
              </button>
            </div>
          </div>
        </label>
        <Button type="lightBlue" btnType="submit">
          Confirm
        </Button>
      </Form>
      <div className="FarmingPopup__footer">
        {type === 'stake' && <PopupLink text="Get USDT-BSW" />}
        {/*Probably must set currencies array.*/}
      </div>
    </Wrapper>
  );
}

FarmingPopupStake.propTypes = {
  id: PropTypes.number,
  currency: PropTypes.string,
};

FarmingPopupStake.defaultProps = {
  id: null,
  currency: '',
};
// Stake end.

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
