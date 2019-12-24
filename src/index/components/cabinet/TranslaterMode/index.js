import React from 'react';
import { connect } from 'react-redux';
import { openModal } from 'actions'
import './TranslaterMode.less';

class TranslaterMode extends React.Component {

  __handleOpenModalTranslate = (e, langString) => {
    openModal('translator', {langString})
    if (e.which ===  3) {
      return alert(2)
    }
    
  }

  render() {
    const {lang, keys} = this.props
    const langString = lang[keys] || keys
    return (
      <div className="Translation" onClick={(e) => this.__handleOpenModalTranslate(e, langString)}>
        {langString}
      </div>
      
    )
  }
}

export default connect(state => ({
  lang: state.default.lang
}))(TranslaterMode)