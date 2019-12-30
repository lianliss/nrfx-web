import React from 'react';
import { openModal } from 'actions'
import './TranslaterMode.less';

class TranslaterMode extends React.Component {

  __handleOpenModalTranslate = (e, langString) => {
    e.preventDefault();
    openModal('translator', {langString})
  }

  render() {
    const { langString } = this.props
    return (
      <span className="Translation" onContextMenu={(e) => this.__handleOpenModalTranslate(e, langString)}>
        {langString}
      </span>
    )
  }
}

export default TranslaterMode