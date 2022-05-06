import "./CabinetExchangeScreen.less";

import React from "react";
import { connect } from "react-redux";
import SwapForm from '../CabinetWalletScreen/components/SwapFormNew/SwapForm';

class CabinetExchangeScreen extends React.PureComponent {
  render() {
    return <>
      <SwapForm />
    </>
  }
}

export default connect(
  state => ({

  }),
  {

  }
)(CabinetExchangeScreen);
