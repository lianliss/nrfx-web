import React from 'react';
import { useRoute } from 'react-router5';

// Components
import { SwitchTabs } from 'src/ui';
import CabinetBlock from '../CabinetBlock/CabinetBlock';
import SVG from 'utils/svg-wrap';
import Exchanger from './containers/Exchanger/Exchanger';
import Farming from './containers/Farming/Farming';
import Preview from './containers/Preview/Preview';

// Utils
import {
  DAPP_REFERRAL,
  DAPP_REFERRAL_EXCHANGER,
  DAPP_REFERRAL_FARMING,
} from 'src/index/constants/pages';
import useAdaptive from 'src/hooks/adaptive';
import { classNames, getLang } from "src/utils";
import { Web3Context } from 'src/services/web3Provider';
import * as actions from "src/actions";

// Styles
import './Referral.less';

function Referral() {
  const { route, router } = useRoute();
  const routeName = route.name;
  const adaptive = useAdaptive();

  const context = React.useContext(Web3Context);
  const {chainId, accountAddress, isConnected} = context;
  const [hashLink, setHashLink] = React.useState();
  const [friends, setFriends] = React.useState([]);
  const [rewards, setRewards] = React.useState([]);

  React.useEffect(() => {
    if (!isConnected || !chainId || !accountAddress) return;

    context.getReferHash().then(hash => {
      if (hash) {
        setHashLink(`https://narfex.com?ref=${hash}`);
      }
    });
    context.getReferFriends().then(setFriends);
    context.getReferRewards().then(setRewards);
  }, [chainId, accountAddress, isConnected]);

  // if (routeName === DAPP_REFERRAL) {
  //   return <Preview adaptive={adaptive} />;
  // }

  const containerParams = {
    hashLink,
    friends,
    rewards,
    adaptive,
  };

  return (
    <CabinetBlock className="Referral">
      <div className="Referral__container">
        {/* <SwitchTabs
          selected={routeName}
          onChange={(value) => {
            router.navigate(value);
          }}
          tabs={[
            { value: DAPP_REFERRAL_EXCHANGER, label: 'Referral Exchanger' },
            { value: DAPP_REFERRAL_FARMING, label: 'Referral Farming', disabled: true },
          ]}
          type="light-blue"
          size="large"
        />
        {routeName === DAPP_REFERRAL_EXCHANGER && (
          <Exchanger {...containerParams} />
        )} */}
        {/* {routeName === DAPP_REFERRAL_FARMING && <Farming {...containerParams} />} */}
        <Exchanger {...containerParams} />
      </div>
    </CabinetBlock>
  );
}

export default Referral;
