import './TokenSelect.less';

import React from 'react';
import { connect } from "react-redux";
import CabinetBlock from 'src/index/components/cabinet/CabinetBlock/CabinetBlock';
import useAdaptive from "src/hooks/adaptive";
import SVG from 'utils/svg-wrap';

class TokenSelect extends React.PureComponent {

  render() {
    const {onChange, onClose, isAdaptive} = this.props;

    return <div className="TokenSelect__wrap">
      <CabinetBlock>
        <div className="TokenSelect">
          <h2>
            <span>
              Select a token
            </span>
            <span className="TokenSelect__close" onClick={onClose}>
              <SVG
                src={
                  isAdaptive
                    ? require("src/asset/24px/angle-left.svg")
                    : require("src/asset/24px/close-large.svg")
                }
              />
            </span>
          </h2>
        </div>
      </CabinetBlock>
    </div>
  }
}

export default connect(
  state => ({
    isAdaptive: state.default.adaptive,
  }),
)(TokenSelect);
