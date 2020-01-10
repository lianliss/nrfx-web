import React from 'react';
import { connect } from 'react-redux';
import UI from 'src/ui';
import SVG from 'react-inlinesvg';
import { openModal, getCurrentLang, saveTranslater } from 'actions'
import { success } from 'actions/toasts'
import { getLang } from 'utils';

import './TranslatorModal.less';

class TranslatorModal extends React.Component {

  state = {
    translateValue: null
  }

  componentDidMount() {
    const { translaterSetting, onClose } = this.props
    if(!translaterSetting) {
      onClose()
    }
  }

  __handleChangeLanguage = () => {
    openModal('language', { byTransletor: true });
  }

  __handleTranslate = () => {
    const { langlist, langCode } = this.props
    if (!langlist) {return false}
    const langTranslate = langlist.find(l => langCode ? l.value === langCode : l.value === 'en');

    return (
      <div className="Translation__title Translation__lang">
        <div>{langTranslate.title} {getLang('cabinet_translation')}</div> 
        <span onClick={this.__handleChangeLanguage}> <SVG src={require(`asset/site/lang-flags/${langTranslate.value}.svg`)}/></span> 
      </div>
    )
  }

  __changeTranslateValue = (value) => {
    this.setState({
      translateValue: value
    })
  }

  __SaveLang = () => {
    const { langCode, langlist, keys, onClose } = this.props
    const { translateValue } = this.state
    const langTranslate = langlist.find(l => langCode ? l.value === langCode : l.value === 'en');

    saveTranslater(langTranslate.value, keys, translateValue)
    success(getLang('cabinet_saveTranslater'))
    onClose()
  }

  render() {
    const { langString } = this.props
    const localKey = getCurrentLang();
    const disabled = !this.state.translateValue
    
    return (
      <UI.Modal noSpacing  isOpen={true} onClose={this.props.onClose}>
        <UI.ModalHeader>{getLang('cabinet_translation')}</UI.ModalHeader>
        <div className="Translation__wrapper">
          <div className="Translation__title">{localKey.value} {getLang('cabinet_key')}</div>
          <div className="Translation__key">{langString}</div>
          { this.__handleTranslate() }
          <UI.Input
            placeholder={getLang('cabinet__typeAnyText')} 
            multiLine 
            autoFocus={true}
            onChange={(e) => this.__changeTranslateValue(e.target.value)}
          />
          <div className="Translation__button"><UI.Button size="large" onClick={this.__SaveLang} disabled={disabled}>{getLang('cabinet_settingsSave')}</UI.Button></div>
        </div>
      </UI.Modal>
    )
  }
}

export default connect(state => ({
  langlist: state.default.langList,
  translaterSetting: state.settings.translaterSetting
}))(TranslatorModal)