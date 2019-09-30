import React from 'react';
//
import {ReactComponent as VKSVG} from '../../../../asset/social/vk.svg';
import {ReactComponent as INSTAGRAMSVG} from '../../../../asset/social/instagram.svg';
import {ReactComponent as TWITTERSVG} from '../../../../asset/social/twitter.svg';
import {ReactComponent as FACEBOOKSVG} from '../../../../asset/social/facebook.svg';
import * as modalGroupActions from '../../../../actions/modalGroup';
import * as utils from '../../../../utils';
import UI from '../../../../ui/index';

class ReferralLink extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sendEmailLinkDisabled: false
    };
  }
  render() {
    return <div>
      {this.__renderReferralLinkBlock()}
    </div>
  }

  __renderReferralLinkBlock = () => {
    return <div className="ReferralLinkBlock__main Content_box">
      <div className="ReferralLinkBlock__line">
        <div className="ReferralLinkBlock__left">
          <div className="h1">
            <span>Referral Link</span>
          </div>
        </div>
        <div className="ReferralLinkBlock__right">
          <div className="ReferralLinkBlock__right_social">
            <VKSVG />
          </div>
          <div className="ReferralLinkBlock__right_social">
            <FACEBOOKSVG />
          </div>
          <div className="ReferralLinkBlock__right_social">
            <INSTAGRAMSVG />
          </div>
          <div className="ReferralLinkBlock__right_social">
            <TWITTERSVG />
          </div>
        </div>
      </div>
      {!this.state.sendEmailLinkDisabled && <div className="ReferralLinkBlock__line">
        <div className="ReferralLinkBlock__left">
        </div>
        <div className="ReferralLinkBlock__right">
          <div className="ReferralLinkBlock__right_button">
            <UI.Button
              size={this.props.adaptive ? 'small' : 'large'}
              type="outline"
              onClick={e => {}}
            >
              Выслать на почту
            </UI.Button>
          </div>
        </div>
      </div>}
      <div className="ReferralLinkBlock__line">
        <div className="ReferralLinkBlock__left">
          <div className="ReferralLinkBlock__description">
            <span>
              Share your referral link with your friends to get more profit!
            </span>
          </div>
        </div>
        <div className="ReferralLinkBlock__right">
          <div className="ReferralLinkBlock__right_button">
            <UI.Button
              size={this.props.adaptive ? 'small' : 'large'}
              onClick={e => {}}
            >
              Скопировать ссылку
            </UI.Button>
          </div>
        </div>
      </div>
    </div>
  }
}

export default ReferralLink;