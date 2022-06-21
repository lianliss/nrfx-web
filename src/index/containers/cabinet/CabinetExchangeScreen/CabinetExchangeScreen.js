import './CabinetExchangeScreen.less';

import React from 'react';
import { connect } from 'react-redux';
import DexSwap from 'src/index/containers/dapp/DexSwap/DexSwap';
import CabinetContent from '../../../components/dapp/CabinetContent/CabinetContent';

class CabinetExchangeScreen extends React.PureComponent {
  render() {
    return (
      <CabinetContent className="Exchange__wrapper">
        <DexSwap />
      </CabinetContent>
    );
  }
}

export default connect((state) => ({}), {})(CabinetExchangeScreen);
