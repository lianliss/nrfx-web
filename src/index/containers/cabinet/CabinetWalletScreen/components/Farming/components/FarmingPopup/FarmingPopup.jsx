import React from 'react';
import PropTypes from 'prop-types';

// All popups for Farming
// is here.

// Import Components
import Popup from 'src/index/components/cabinet/Popup/Popup';
import {
  NumberFormat,
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

// Styles
import './FarmingPopup.less';

// Main Components
// Staked Popup
export function FarmingPopupStaked({ currency, number, onClose }) {
  const [isHover, setIsHover] = React.useState(false);
  const isDisabled = popupTimer(isHover, onClose);
  const text =
    'Share your earnings on Twitter and win|a part of $1060 in BSW Prize Pool|for 202 winners every week!';
  const paragraphs = text.split('|');

  return (
    <Popup
      className={`FarmingPopup ${isDisabled && 'disabled'}`}
      onClose={onClose}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="FarmingPopup__header">
        <div className="success-title">
          <SVG src={require('src/asset/icons/cabinet/success-icon.svg')} />
          <span>Staked</span>&nbsp;
          <NumberFormat number={number} currency={currency} />
        </div>
        <p>
          {paragraphs.map((paragraph, key) => (
            <React.Fragment key={key}>
              <span>{paragraph}</span>
              <br />
            </React.Fragment>
          ))}
        </p>
      </div>
      <div className="FarmingPopup__center">
        <PopupLink text="Wiew on scan" />
        <Button type="lightBlue">Share</Button>
      </div>
      <div className="FarmingPopup__footer">
        <span>
          *Check <a href="/">Sharing Season</a> details
        </span>
      </div>
    </Popup>
  );
}

FarmingPopupStaked.propTypes = {
  currency: PropTypes.string,
  number: PropTypes.number,
  onClose: PropTypes.func,
};

FarmingPopupStaked.defaultProps = {
  onClose: () => {},
};
// Staked end.

// Unstaked Popup
export function FarmingPopupUnstaked({ currency, number, onClose }) {
  return (
    <Popup className="FarmingPopup" onClose={onClose}>
      <div className="FarmingPopup__header">
        <div className="success-title">
          <SVG src={require('src/asset/icons/cabinet/success-icon.svg')} />
          <span>Unstaked</span>&nbsp;
          <NumberFormat number={number} currency={currency} />
        </div>
      </div>
      <PopupLink text="Wiew on scan" />
    </Popup>
  );
}

FarmingPopupUnstaked.propTypes = {
  currency: PropTypes.string,
  number: PropTypes.number,
  onClose: PropTypes.func,
};

FarmingPopupUnstaked.defaultProps = {
  onClose: () => {},
};
// Unstaked end.

// Stake Modal
export function FarmingPopupStake({ id, currency, ...props }) {
  // States
  const [value, setValue] = React.useState(15);
  const [isStaked, setIsStaked] = React.useState(false);

  // Handlers
  // Just input handler
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // Confirm click handler
  const handleConfirm = () => {
    setIsStaked(true);
  };

  // Return popup when stake.
  if (isStaked) {
    return (
      <FarmingPopupStaked
        currency={currency}
        number={value}
        onClose={props.onClose}
      />
    );
  }

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
          <span>Stake {currency.toUpperCase()} Tokens</span>
        </div>
        <p>Depositing available tokens on deposit</p>
      </div>
      <div className="FarmingPopup__body">
        <p>Balance</p>
        <span className="balance">
          <NumberFormat number={15.5} currency={currency} />
        </span>
        <label>
          <p>Stake</p>
          <div className="input-container">
            <Input type="number" value={value} onTextChange={handleChange} />
            <div className="input-controls" onClick={() => {}}>
              <span>Max</span>
            </div>
          </div>
        </label>
        <Button type="lightBlue" onClick={handleConfirm}>
          Confirm
        </Button>
        <div className="FarmingPopup__footer">
          <PopupLink text="Get USDT-BSW" />{' '}
          {/*Probably must get currencies array.*/}
        </div>
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
      className="FarmingPopup FarmingPopup__fullscreen FarmingPopupStake"
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
