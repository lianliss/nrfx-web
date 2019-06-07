import React from 'react';
import './SitePageInfoBlock.less';
import UI from '../../../ui';
import PropTypes from 'prop-types';
import * as utils from '../../../utils';

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

    const screenClassName = utils.classNames({
      SitePageInfoBlock__screen: true,
      loaded: this.state.isImageLoaded,
    });

    return (
      <div className="SitePageInfoBlock">
        <div className="SitePageInfoBlock__cont">
          <div className="SitePageInfoBlock__title">{this.props.title}</div>
          <div className="SitePageInfoBlock__caption">{this.props.caption}</div>
          <div className="SitePageInfoBlock__buttons">
            <UI.Button rounded style={{width: 239}}>{this.props.buttonText}</UI.Button>
            <UI.WatchButton>Смотреть</UI.WatchButton>
          </div>
        </div>
        <div className={screenClassName} style={{backgroundImage: `url(${this.props.image})`}} />
      </div>
    )
  }
}

SitePageInfoBlock.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  buttonText: PropTypes.string.isRequired,
};
