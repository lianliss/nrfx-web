import React from 'react';

// Components
import { Row } from 'ui';
import { CabinetBlock, CustomButton } from 'dapp';
import SVG from 'utils/svg-wrap';

// Utils
import likeIcon from 'src/asset/icons/social/like.svg';
import dislikeIcon from 'src/asset/icons/social/dislike.svg';

// Styles
import './index.less';

function Feedback({ adaptive }) {
  return (
    <CabinetBlock className="p2p-order-body__feedback">
      <h3>How was your trading experience?</h3>
      <Row alignItems="center" gap={adaptive ? 7 : 15} wrap={adaptive}>
        <CustomButton>
          <Row gap={8} alignItems="center" justifyContent="center">
            <SVG src={likeIcon} flex />
            <span>Positive</span>
          </Row>
        </CustomButton>
        <CustomButton>
          <Row gap={8} alignItems="center" justifyContent="center">
            <SVG src={dislikeIcon} flex />
            <span>Negative</span>
          </Row>
        </CustomButton>
      </Row>
    </CabinetBlock>
  );
}

export default Feedback;
