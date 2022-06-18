import "./CabinetExchangeScreen.less";

import React from "react";
import { connect } from "react-redux";
import DexSwap from 'src/index/containers/dapp/DexSwap/DexSwap';

class CabinetExchangeScreen extends React.PureComponent {
  render() {
    return <div className="Exchange__wrapper">
      <DexSwap />
    </div>
  }
}

export default connect(
  state => ({

  }),
  {

  }
)(CabinetExchangeScreen);
