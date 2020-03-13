import './DocumentationWrapper.less';

import React from 'react';
import { connect } from 'react-redux';

import { classNames as cn } from '../../utils/index';
import Header from '../../index/components/documentation/Header/Header';
import Menu from 'src/index/components/documentation/Menu/Menu';
import * as UI from 'src/ui';

const DocumentationWrapper = (props) => {
  return <div className={cn("Documentation_wrapper", { pending: props.pending })}>
    <div className="Documentation_wrapper__header">
      <Header />
    </div>
    <div className="Documentation_wrapper__layout">
      <div className="Documentation_wrapper__menu">
        <Menu />
      </div>
      {props.children}
    </div>
  </div>
}

export default connect(state => ({

}))(DocumentationWrapper);
