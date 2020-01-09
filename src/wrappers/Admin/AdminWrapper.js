import './AdminWrapper.less';

import React from 'react';
import { connect } from 'react-redux';

import { classNames as cn } from '../../utils/index';
import Header from '../../admin/components/Header/Header';
import Menu from '../../admin/components/Menu/Menu';
import ContentBox from '../../ui/components/ContentBox/ContentBox';
import LoadingStatus from '../../index/components/cabinet/LoadingStatus/LoadingStatus';

const AdminWrapper = (props) => {
  return <div className={cn("Admin_wrapper", { pending: props.pending })}>
    <div className="Admin_wrapper__header">
      <Header />
    </div>
    <div className="Admin_wrapper__layout">
      <ContentBox className="Admin_wrapper__menu">
        <Menu />
      </ContentBox>
      <div className="Admin_wrapper__content">
        <div className="Admin_wrapper__loader">
          <LoadingStatus status={'loading'} />
        </div>
        {props.children}
      </div>
    </div>
  </div>
}

export default connect(
  state => ({
    pending: state.admin.pending
  })
)(AdminWrapper);
