import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';
import { Web3Context } from 'services/web3Provider';
import wei from 'utils/wei';
import _ from 'lodash';

import {
  NumberFormat,
  Form,
  Button,
  Input,
  Modal,
  BottomSheetModal,
} from 'src/ui';
import SVG from 'utils/svg-wrap';

// Utils
import { toastPush } from 'src/actions/toasts';

// Styles
import './FarmingPopupStake.less';

function PopupLink({ text, onClick }) {
  return (
    <span className="popup-link" onClick={onClick}>
      {text} <SVG src={require('src/asset/icons/export.svg')} />
    </span>
  );
}

// Stake Modal - Can expand.
class FarmingPopupStake extends React.PureComponent {
  static contextType = Web3Context;

  state = {
    value: '0',
    amount: 0,
    token0: null,
    token1: null,
  };

  handleChange = newValue => {
    setValue(newValue);
  };

  handleSubmit = e => {
    const {toastPush, modal} = this.props;
    const {value} = this.state;

    e.preventDefault();

    if (modal === 'stake') {
      toastPush(`Staked ${value} LP`, 'farming')
    }

    if (modal === 'unstake') {
      toastPush(`Unstaked ${value} LP`, 'farming')
    }

    this.props.onClose();
  };

  componentDidMount() {
    this._mount = true;
    const {getTokenContract, tokens} = this.context;
    const {pool} = this.props;
    if (!pool) {this.props.onClose(); return}

    this.tokenContract = getTokenContract(pool);
    this.token0Contract = getTokenContract(pool.token0);
    this.token1Contract = getTokenContract(pool.token1);


    const token0 = _.get(tokens.find(t => t.address === pool.token0))
  }

  componentWillUnmount() {
    this._mount = false;
  }

  render() {
    const {toastPush, adaptive, modal, pool} = this.props;
    const {getTokenContract, farm} = this.context;
    const {value} = this.state;
    const Wrapper = adaptive ? BottomSheetModal : Modal;
    // States

    return (
      <Wrapper
        className="FarmingPopup FarmingPopup__fullscreen FarmingPopupStake"
        {...this.props}
        skipClose
      >
        <div className="close" onClick={this.props.onClose}>
          <SVG src={require('src/asset/icons/close-popup.svg')} />
        </div>
        <div className="FarmingPopup__header">
          <div className="title">
          <span>
            {modal === 'stake' ? 'Stake' : 'Unstake'}
            &nbsp;Tokens
          </span>
          </div>
        </div>
        <Form className="FarmingPopup__body" onSubmit={this.handleSubmit.bind(this)}>
          <label>
            <div className="FarmingPopup__label">
            <span className="default-text">
              {modal === 'stake' ? 'Stake' : 'Unstake'}
            </span>
              <span className="default-text">
              Balance: <NumberFormat number={wei.from(_.get(pool, 'balance', '0'))} />
            </span>
            </div>
            <div className="input-container">
              <Input type="number" value={value} onTextChange={this.handleChange.bind(this)} />
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
          {modal === 'stake' && <PopupLink text="Get USDT-BSW" />}
          {/*Probably must set currencies array.*/}
        </div>
      </Wrapper>
    );
  }
}

export default connect(state => ({
  adaptive: state.default.adaptive,
}), dispatch => bindActionCreators({
  toastPush,
}, dispatch), null, {pure: true})(FarmingPopupStake);
