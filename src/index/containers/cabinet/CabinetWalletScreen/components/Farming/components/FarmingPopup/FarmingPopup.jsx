import React from 'react';
import PropTypes from 'prop-types';

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

// Styles
import './FarmingPopup.less';

// Main Components
// Popup
export function FarmingPopup({ title, currency, number, onClose }) {
  const [isHover, setIsHover] = React.useState(false);
  const isDisabled = popupTimer(isHover, onClose);

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
          <span>{title}</span>&nbsp;
          <NumberFormat number={number} currency={currency} />
        </div>
      </div>
      <PopupLink text="Wiew on scan" />
    </Popup>
  );
}

FarmingPopup.propTypes = {
  title: PropTypes.string,
  currency: PropTypes.string,
  number: PropTypes.number,
  onClose: PropTypes.func,
};

FarmingPopup.defaultProps = {
  title: '',
  currency: '',
  number: 0,
  onClose: () => {},
};
// Popup end.

// Stake Modal - Can expand.
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
  const handleSubmit = () => {
    setIsStaked(true);
  };

  // Return popup when stake.
  // When write the functionality have to move to another place.
  if (isStaked) {
    return (
      <FarmingPopup
        title="Staked"
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
          <p>Stake</p>
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
