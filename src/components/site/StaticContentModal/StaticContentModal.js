import './StaticContentModal.less';
//
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
//
import UI from '../../../ui';
import * as utils from '../../../utils';
import { getStaticPageContent } from '../../../actions';

function StaticContentModal(props) {
  const { children, type } = props;
  const [isOpen, toggleOpen] = useState(false);
  const currentInfo = props[type];
  const currentData = currentInfo && currentInfo.data;

  useEffect(() => {
    if (!currentInfo) {
      getStaticPageContent(type)
    }
  }, [currentInfo, type]);

  const handleOpen = e => {
    document.body.classList.add('modal-open');
    toggleOpen(true);
  };

  const handleClose = () => {
    document.body.classList.remove('modal-open');
    toggleOpen(false);
  };

  return (
    <div className="StaticContentModal">
      <span className="StaticContentModal__opener" onClick={handleOpen}>
        {children}
      </span>

      {currentData && <UI.Modal isOpen={isOpen} onClose={handleClose}>
        <div className="StaticContentModal__content__wrapper">
          <h3 className="StaticContentModal__title">{currentData.title}</h3>
          <div className="StaticContentModal__content" dangerouslySetInnerHTML={{ __html: currentData.content }} />
          <UI.Button
            fontSize={15}
            onClick={handleClose}>{utils.getLang('site__goBack')}
          </UI.Button>
        </div>
      </UI.Modal>}
    </div>
  )
}

const mapStateToProps = state => ({
  default: state.default,
  lang: state.default.lang,
  terms: state.default.terms,
  privacy: state.default.privacy,
});

export default React.memo(connect(mapStateToProps)(StaticContentModal));