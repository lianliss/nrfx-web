import React from 'react';
import { connect } from 'react-redux';
import { openModal } from 'actions'
import './TranslaterMode.less';

class TranslaterMode extends React.Component {

  __handleOpenModalTranslate = (e, langString) => {
    e.preventDefault();
    openModal('translator', {langString})
  }

  render() {
    const {lang, keys} = this.props
    const langString = lang[keys] || keys
    return (
      <span className="Translation" onContextMenu={(e) => this.__handleOpenModalTranslate(e, langString)}>
        {langString}
      </span>
      
    )
  }
}

export default connect(state => ({
  lang: state.default.lang
}))(TranslaterMode)