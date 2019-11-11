import './StaticContentModal.less';
//
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//
import UI from '../../../ui';
import * as utils from '../../../utils';
import { getStaticPageContent } from '../../../actions';

function StaticContentModal(props) {
  const { type } = props;
  const currentInfo = props[type];
  const currentData = currentInfo && currentInfo.data;

  useEffect(() => {
    if (!currentInfo) {
      getStaticPageContent(type)
    }
  }, [currentInfo, type]);

  if (currentData) {
    return (
      <UI.Modal isOpen={true} className="StaticContentModal" onClose={props.onBack}>
        <div className="StaticContentModal__content__wrapper">
          <h3 className="StaticContentModal__title">{currentData.title}</h3>
          <div className="StaticContentModal__content" dangerouslySetInnerHTML={{ __html: currentData.content }} />
          <UI.Button
            fontSize={15}
            onClick={props.onBack}>{utils.getLang('site__goBack')}
          </UI.Button>
        </div>
      </UI.Modal>
    )
  }
  return null;
}

const mapStateToProps = state => ({
  default: state.default,
  lang: state.default.lang,
  terms: state.default.terms,
  privacy: state.default.privacy,
  pool_terms: state.default.pool_terms
});

export default React.memo(connect(mapStateToProps)(StaticContentModal));