import React from 'react';
import UI from 'src/ui';
import SVG from 'react-inlinesvg';
import { openModal, getCurrentLang } from 'actions'

import './TranslatorModal.less';

export default class TranslatorModal extends React.Component {

  __handleChangeLanguage = e => {
    e.preventDefault();
    openModal('language');
  }


  render() {
    const { langString } = this.props
    const lang = getCurrentLang();

    return (
      <UI.Modal noSpacing  isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>Translation</UI.ModalHeader>
        <div className="Translation__wrapper">
          <div className="Translation__title">En Key</div>
          <div className="Translation__key">{langString}</div>
          <div className="Translation__title Translation__lang">
            {lang.title} Translation <span onClick={this.__handleChangeLanguage}> <SVG src={require(`asset/site/lang-flags/${lang.value}.svg`)} /></span>
          </div>
          <UI.Input placeholder="Type Any Text" multiLine />
          <div className="Translation__button"><UI.Button size="large">Save</UI.Button></div>
        </div>
      </UI.Modal>
    )
  }
}
