import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

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
      className={`FarmingPopup ${isDisabled && 'disabled'}`}
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
  const type = props.modal; // stake || unstake
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
    <Modal
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
            {type === 'stake' ? 'Stake' : 'Unstake'} {currency.toUpperCase()}{' '}
            Tokens
          </span>
        </div>
      </div>
      <Form className="FarmingPopup__body" onSubmit={handleSubmit}>
        <div className="FarmingPopup__balance">
          <p>Balance</p>
          <span className="balance">
            <NumberFormat number={15.5} />
            &nbsp; BNB-NRFX
          </span>
        </div>
        <label>
          <p>{type === 'stake' ? 'Stake' : 'Unstake'}</p>
          <div className="input-container">
            <Input type="number" value={value} onTextChange={handleChange} />
            <div className="input-controls" onClick={() => {}}>
              <span>Max</span>
            </div>
          </div>
        </label>
        <Button type="lightBlue" btnType="submit">
          Confirm
        </Button>
      </Form>
      <div className="FarmingPopup__footer">
        <PopupLink text="Get USDT-BSW" />
        {/*Probably must set currencies array.*/}
      </div>
    </Modal>
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
  return (
    <Modal
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
    </Modal>
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
