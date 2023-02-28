import React, { Component } from 'react';
import { connect } from 'react-redux';

// Components
import DappContainer from '../../../components/cabinet/DappContainer/DappContainer';
import CabinetSidebar from 'src/index/components/dapp/CabinetSidebar/CabinetSidebar';
import TestnetOverlay from 'dapp/TestnetOverlay/TestnetOverlay';

// Utils
import { DAPP, DAPP_EXCHANGE } from 'src/index/constants/pages';
import router from 'src/router';
import { Web3Context } from 'src/services/web3Provider';
import { getFinePage, pageIsFine } from './utils/pageUtils';
import _ from 'lodash';

const DEFAULT_DAPP_PAGE = DAPP_EXCHANGE;

class DappCabinet extends Component {
  componentDidMount() {
    if (this.props.route.name === DAPP) {
      router.navigate(DEFAULT_DAPP_PAGE);
    }

    this.redirectToFine();

    if (!this.props.dappMounted) {
      this.props.mountDapp();
    }
  }

  componentDidUpdate(prevProps) {
    const prevRoute = _.get(prevProps, 'route.name');
    const nextProps = _.get(this, 'props.route.name');
    const prevChainId = _.get(prevProps, 'chainId');
    const nextChainId = _.get(this, 'props.chainId');

    if (prevRoute === nextProps && prevChainId === nextChainId) return;

    this.redirectToFine();
  }

  redirectToFine() {
    const routeName = this.props.route.name;
    const chainId = this.props.chainId;

    if (!pageIsFine(routeName, chainId) && routeName !== DEFAULT_DAPP_PAGE) {
      router.navigate(DEFAULT_DAPP_PAGE);
    }
  }

  render() {
    const { route, adaptive } = this.props;
    const { Component, mainnetOnly, testnetOnly, chainsWhitelist, chainsBlacklist } = getFinePage(route.name);

    return (
      <DappContainer
        className="CabinetWalletScreen"
        sideBar={<CabinetSidebar />}
      >
        <Component route={route.name} adaptive={adaptive} />
        {testnetOnly && <TestnetOverlay testnetOnly networks={[97]} />}
        {mainnetOnly && <TestnetOverlay mainnetOnly networks={[56]} />}
        {(chainsWhitelist || chainsBlacklist) && <TestnetOverlay {...{chainsWhitelist, chainsBlacklist}} />}
      </DappContainer>
    );
  }
}

const DappWrapper = (props) => {
  const { network, mountDapp, dappMounted } = React.useContext(Web3Context);
  const { chainId } = network;
  const memoizedDappCabinet = React.useMemo(
    () => (
      <DappCabinet
        {...props}
        network={network}
        chainId={chainId}
        dappMounted={dappMounted}
        mountDapp={mountDapp}
      />
    ),
    [props, network, chainId, dappMounted]
  );

  return memoizedDappCabinet;
};

export default connect((state) => ({
  route: state.router.route,
  adaptive: state.default.adaptive,
}))(DappWrapper);
