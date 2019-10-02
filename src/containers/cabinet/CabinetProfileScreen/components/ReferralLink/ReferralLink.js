import './ReferralLink.less';

import React from 'react';
import UI from '../../../../../ui/index';

import { ReactComponent as VkIcon } from '../../../../../asset/social/vk.svg';
import { ReactComponent as InstIcon } from '../../../../../asset/social/instagram.svg';
import { ReactComponent as TwitterIcon } from '../../../../../asset/social/twitter.svg';
import { ReactComponent as FbIcon } from '../../../../../asset/social/facebook.svg';

class ReferralLink extends React.Component {
  render() {
    return (
      <div className="ReferralLink Content_box">
        <div className="ReferralLink__left">
          <div className="ReferralLink__title">Referral Link</div>
          <div className="ReferralLink__caption">Share your referral link with your friends to get more profit!</div>
        </div>
        <div className="ReferralLink__right">
          <div className="ReferralLink__right__social_buttons">
            <a href={this.__buildVKUrl()} className="ReferralLink__right__social_button" target="_blank">
              <VkIcon />
            </a>
            <div className="ReferralLink__right__social_button">
              <InstIcon />
            </div>
            <a href={this.__buildTwitterUrl()} className="ReferralLink__right__social_button" target="_blank">
              <TwitterIcon />
            </a>
            <a href={this.__buildFbUrl()} className="ReferralLink__right__social_button" target="_blank">
              <FbIcon />
            </a>
          </div>
          <UI.Button onClick={this.props.linkDidCopy}>Скопировать ссылку</UI.Button>
        </div>
      </div>
    )
  }

  __buildVKUrl = () => {
    return `https://vk.com/share.php?url=${this.props.inviteLink}`;
  };

  __buildFbUrl = () => {
    return `https://www.facebook.com/sharer/sharer.php?u=${this.props.inviteLink}`;
  };

  __buildTwitterUrl = () => {
    return `https://twitter.com/intent/tweet?url=${this.props.inviteLink}`;
  };
}

export default ReferralLink;