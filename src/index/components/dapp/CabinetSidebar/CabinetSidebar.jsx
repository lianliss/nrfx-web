import React from 'react';
import PropTypes from 'prop-types';

import CabinetScrollBlock from '../CabinetScrollBlock/CabinetScrollBlock';
import NarfexRate from './components/NarfexRate/NarfexRate';
import Items from './components/Items/Items';
import { useSidebarContainerHeight } from './hooks/useSidebarContainerHeight';
import { Web3Context } from 'src/services/web3Provider';

import './CabinetSidebar.less';

function CabinetSidebar({ className, adaptive }) {
  const containerSize = useSidebarContainerHeight(adaptive);

  return (
    <div className={`CabinetSidebar ${className}`}>
      <div
        className="CabinetSidebar__container"
        style={{ height: !adaptive && containerSize }}
      >
        <CabinetScrollBlock>
          <Items />
          {adaptive && <NarfexRate />}
        </CabinetScrollBlock>
      </div>
      {!adaptive && <NarfexRate />}
    </div>
  );
}

CabinetSidebar.propTypes = {
  className: PropTypes.string,
  adaptive: PropTypes.bool,
};
CabinetSidebar.defaultProps = {
  className: '',
  adaptive: false,
};

const CabinetSidebarWrapper = (props) => {
  const { network } = React.useContext(Web3Context);

  const memoizedCabinetSidebar = React.useMemo(
    () => <CabinetSidebar {...props} network={network} />,
    [props, network]
  );

  return memoizedCabinetSidebar;
};

CabinetSidebarWrapper.propTypes = CabinetSidebar.propTypes;
CabinetSidebarWrapper.defaultProps = CabinetSidebar.defaultProps;

export default CabinetSidebarWrapper;
