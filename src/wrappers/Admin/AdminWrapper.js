import './AdminWrapper.less';

import React from 'react';
import { connect } from 'react-redux';

import { classNames as cn } from '../../utils/index';
import Header from '../../admin/components/Header/Header';
import Menu from '../../admin/components/Menu/Menu';

const AdminWrapper = (props) => {
  return <div className={cn("Admin_wrapper", { pending: props.pending })}>
    <div className="Admin_wrapper__header">
      <Header />
    </div>
    <div className="Admin_wrapper__layout">
      <div className="Admin_wrapper__menu Content_box">
        <Menu />
      </div>
      <div className="Admin_wrapper__content">{props.children}</div>
    </div>
  </div>
}

export default connect(
  state => ({
    pending: state.admin.pending
  })
)(AdminWrapper);