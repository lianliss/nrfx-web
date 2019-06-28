import './SitePageInfoBlock.less';

import React from 'react';
import PropTypes from 'prop-types';

import UI from '../../../ui';
import * as utils from '../../../utils';
import AuthModal from '../AuthModal/AuthModal';

export default class SitePageInfoBlock extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isImageLoaded: false
    };
  }

  componentDidMount() {
    const image = new Image();
    image.onload = () => this.setState({isImageLoaded: true});
    image.src = this.props.image;
  }

  render() {
    // const { hideWatchButton } = this.props;
    const screenClassName = utils.classNames({
      SitePageInfoBlock__screen: true,
      loaded: this.state.isImageLoaded,
    });

    return (
      <div className="SitePageInfoBlock">
        <div className="SitePageInfoBlock__cont">
          <h1 className="SitePageInfoBlock__title">{this.props.title}</h1>
          <p className="SitePageInfoBlock__caption">{this.props.caption}</p>
          <div className="SitePageInfoBlock__buttons">
            <AuthModal className="SitePageInfoBlock__modal">
              <UI.Button rounded style={{width: 239}}>{this.props.buttonText}</UI.Button>
            </AuthModal>
            {/* {!hideWatchButton ? <UI.WatchButton>Смотреть</UI.WatchButton> : null} */}
          </div>
        </div>
        {/* <div className={screenClassName} style={{backgroundImage: `url(${this.props.image})`}} /> */}
        <img className={screenClassName} src={this.props.image} alt="bitcoinbot-main-banner" />
      </div>
    )
  }
}

SitePageInfoBlock.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  buttonText: PropTypes.string.isRequired,
  hideWatchButton: PropTypes.bool,
};
