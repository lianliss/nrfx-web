import './StaticContentModal.less';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import UI from '../../../ui';
import * as utils from '../../../utils';
import * as storage from '../../../services/storage';
import { getStaticPageContent } from '../../../actions';



function StaticContentModal(props) {
  const { children, type } = props;
  const [isOpen, toggleOpen] = useState(false);
  const currentInfo = props[type];
  const currentData = currentInfo && currentInfo.data;


  useEffect(() => {
    const currentLang = storage.getItem('lang') || 'en';

    if (!currentInfo || currentInfo.lang !== currentLang) {
      getStaticPageContent(type, currentLang)
    }
  }, [currentInfo, type])

  const handleClose = () => {
    toggleOpen(false);
  }

  return (
    <div className="StaticContentModal">
      <span onClick={() => toggleOpen(true)}>
        {children}
      </span>

      {currentData
        ? (
          <UI.Modal
            isOpen={isOpen}
            onClose={handleClose}
          >
            <div className="StaticContentModal__content__wrapper">
              <h3 className="StaticContentModal__title">{currentData.title}</h3>

              <div className="StaticContentModal__content" dangerouslySetInnerHTML={{ __html: currentData.content }} />

              <UI.Button onClick={() => toggleOpen(false)}>{utils.getLang('site__goBack')}</UI.Button>
            </div>
          </UI.Modal>
        ) : null}
    </div>
  )
}

const mapStateToProps = (state) => ({
  lang: state.default.lang,
  terms: state.default.terms,
  privacy: state.default.privacy,
})

export default React.memo(connect(mapStateToProps)(StaticContentModal));