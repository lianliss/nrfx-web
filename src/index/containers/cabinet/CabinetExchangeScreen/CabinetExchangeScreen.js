import './CabinetExchangeScreen.less';

import React from 'react';
import { connect } from 'react-redux';
import DexSwap from '../DexSwap/DexSwap';
import { getLang } from 'utils';
import SVG from 'utils/svg-wrap';

class CabinetExchangeScreen extends React.PureComponent {
  state = {
    isModal: false,
  };

  render() {
    const { isModal } = this.state;
    return (
      <div className={`Exchange__wrapper${isModal ? ' isModal' : ''}`}>
        <div className="Exchange__container">
          <div className="Exchange__header">
            <div className="Exchange__row">
              <h1>{getLang('dex_title')}</h1>
            </div>
          </div>
          <div className="Exchange__row">
            <DexSwap
              openModal={() => this.setState({ isModal: true })}
              closeModal={() => this.setState({ isModal: false })}
            />
          </div>
          <div className="Exchange__bg-center">
            <SVG
              src={require('src/asset/backgrounds/cabinet-swap/center-of-screen-fix.svg')}
            />
          </div>
        </div>
        <div className="Exchange__bg">
          <SVG
            src={require('src/asset/backgrounds/cabinet-swap/right-of-screen-fix.svg')}
          />
        </div>
        <div className="modal-bg" />
      </div>
    );
  }
}

export default connect((state) => ({}), {})(CabinetExchangeScreen);
