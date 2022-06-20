import "./Bonus.less";

import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import web3Backend from "services/web3-backend";

import {
  web3Update,
  web3SetData,
} from 'actions/cabinet/web3';

import {
  Input,
  Button,
  ContentBox,
} from 'ui';

import {
  getLang,
} from 'utils';
import SVG from "utils/svg-wrap";

import * as toast from 'actions/toasts';

class Bonus extends React.PureComponent {

  state = {
    isLoading: false,
  };

  receive = async () => {
    const {wallets, balances, web3SetData} = this.props;

    this.setState({isLoading: true});
    try {
      const data = await web3Backend.receiveBonus();
      wallets.map(wallet => delete wallet.bonus);

      // Update the balance
      web3SetData({
        wallets: wallets.map(wallet => ({
          ...wallet,
          bonus: 0,
        })),
        balances: [{
          address: wallets[0].address,
          items: await web3Backend.getBalances(data.address),
        }],
      });

      toast.success(getLang('cabinetBonus_success'));
    } catch (error) {
      this.setState({isLoading: false});
      const message = _.get(error, 'data.name', _.get(error, 'data.message', error.message));
      console.error('[Bonus] receive', error);
      toast.warning(getLang(message));
    }
  };

  render() {
    const {wallets} = this.props;
    const {isLoading} = this.state;
    const bonus = _.get(wallets, '[0].bonus', 0);

    return <ContentBox className="Bonus">
      <h2>
        {getLang('cabinetBonus_header')} {bonus} NRFX
      </h2>
      <p>
        {!!wallets.length
          ? getLang('cabinetBonus_get')
          : getLang('cabinetBonus_connect')}
      </p>
      {isLoading ? <center className="Bonus-loading">
          <SVG src={require(`src/asset/cabinet/loading_34.svg`)} />
          <div className="Bonus-loading-text">
            {getLang("cabinetBonus_loading")}
          </div>
        </center>
      : <center>
        {!!wallets.length && <Button onClick={() => this.receive()}>
          {getLang('cabinetBonus_receive')}
        </Button>}
      </center>}
    </ContentBox>
  }
}


export default connect(state => ({
  wallets: state.web3.wallets,
  balances: state.web3.balances,
}), dispatch => bindActionCreators({
  web3Update,
  web3SetData,
}, dispatch), null, {pure: true})(Bonus);
