import './ReferralLink.less';

import React from 'react';
import UI from '../../../../../ui/index';

import { ReactComponent as VkIcon } from '../../../../../asset/social/vk.svg';
import { ReactComponent as TwitterIcon } from '../../../../../asset/social/twitter.svg';
import { ReactComponent as FbIcon } from '../../../../../asset/social/facebook.svg';

class ReferralLink extends React.Component {
  render() {
    return (
      <div className="ReferralLink Content_box">
        <div className="ReferralLink__left">
          <div className="ReferralLink__title">Referral Link</div>
          <div className="ReferralLink__caption">Вы можете воспользоваться своей реферальной ссылкой для приглашения партнеров и получения дополнительной прибыли с первого депозита реферала, вознаграждение составляет 3 % от суммы депозита.</div>
        </div>
        <div className="ReferralLink__right">
          <div className="ReferralLink__right__social_buttons">
            <a href={this.__buildVKUrl()} className="ReferralLink__right__social_button" target="_blank">
              <VkIcon />
            </a>
            <a href={this.__buildTwitterUrl()} className="ReferralLink__right__social_button" target="_blank">
              <TwitterIcon />
            </a>
            <a href={this.__buildFbUrl()} className="ReferralLink__right__social_button" target="_blank">
              <FbIcon />
            </a>
          </div>

          <div>
            <div className="ReferralLink__link">{this.props.inviteLink.replace('https://', '')}</div>
            <UI.Button onClick={() => this.props.linkDidCopy(this.props.inviteLink)}>Скопировать ссылку</UI.Button>
          </div>
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