import React from 'react';

// Components
import SwitchTheMode from '../SwitchTheMode';
import { Row } from 'ui';
import { CustomButton, WalletIcon } from 'dapp';
import SVG from 'utils/svg-wrap';

// Utils

// Styles
import './index.less';

function AdaptiveFilters({ mode }) {
  return (
    <div className="orders-list-filters--adaptive">
      <SwitchTheMode mode={mode} size="small" />
      <Row
        className="orders-list-filters--adaptive-content"
        alignItems="center"
      >
        <CustomButton>
          <WalletIcon currency="IDR" size={16.9} />
          IDR
          <SVG
            src={require('src/asset/icons/arrows/form-dropdown.svg')}
            className="dark-dropdown-icon"
            style={{ marginLeft: 5 }}
            flex
          />
        </CustomButton>
        <CustomButton>
          Filter
          <SVG
            src={require('src/asset/icons/action/filter.svg')}
            style={{ marginLeft: 3 }}
            flex
          />
        </CustomButton>
        <CustomButton>
          Refresh
          <SVG
            src={require('src/asset/icons/action/reload-gray.svg')}
            style={{ marginLeft: 3 }}
            flex
          />
        </CustomButton>
      </Row>
    </div>
  );
}

export default AdaptiveFilters;
