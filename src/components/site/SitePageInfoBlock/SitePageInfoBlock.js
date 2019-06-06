import React from 'react';
import './SitePageInfoBlock.less';
import UI from '../../../ui';
import PropTypes from 'prop-types';

export default function SitePageInfoBlock(props) {
  return (
    <div className="SitePageInfoBlock">
      <div className="SitePageInfoBlock__cont">
        <div className="SitePageInfoBlock__title">{props.title}</div>
        <div className="SitePageInfoBlock__caption">{props.caption}</div>
        <div className="SitePageInfoBlock__buttons">
          <UI.Button rounded style={{width: 239}}>{props.buttonText}</UI.Button>
          <UI.WatchButton>Смотреть</UI.WatchButton>
        </div>
      </div>
      <div className="SitePageInfoBlock__screen" />
    </div>
  )
}

SitePageInfoBlock.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  buttonText: PropTypes.string.isRequired,
};
