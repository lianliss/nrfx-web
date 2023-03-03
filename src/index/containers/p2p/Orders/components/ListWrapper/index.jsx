import React from 'react';

// Components
import AdaptiveList from '../AdaptiveList';
import List from '../List';
import SVG from 'utils/svg-wrap';
import { CabinetBlock, CustomButton } from 'dapp';

// Styles
import './index.less';

function ListWrapper({ adaptive, ...props }) {
  const listComponent = adaptive ? (
    <AdaptiveList {...props} />
  ) : (
    <List {...props} />
  );

  const PaginationNumber = ({ number }) => (
    <CustomButton className="orders-list-pagination__number">
      {number}
    </CustomButton>
  );

  return (
    <CabinetBlock className="orders-list__wrapper">
      {listComponent}
      <div className="orders-list-pagination">
        <CustomButton className="orders-list-pagination__prev">
          <SVG
            src={require('src/asset/icons/arrows/arrow-pagination-left.svg')}
            flex
          />
        </CustomButton>
        <PaginationNumber number={1} />
        <PaginationNumber number={2} />
        <PaginationNumber number={3} />
        <div className="orders-list-pagination__skip">...</div>
        <PaginationNumber number={42} />
        <CustomButton className="orders-list-pagination__next">
          <SVG
            src={require('src/asset/icons/arrows/arrow-pagination-right.svg')}
            flex
          />
        </CustomButton>
      </div>
    </CabinetBlock>
  );
}

export default ListWrapper;
