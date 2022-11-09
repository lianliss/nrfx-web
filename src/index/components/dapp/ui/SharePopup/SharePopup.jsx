import React from 'react';
import PropTypes from 'prop-types';

// Components
import { ActionSheet, Row } from 'ui';
import SVG from 'utils/svg-wrap';

// Styles
import './SharePopup.less';

function SharePopup({ children, sharingURI = '' }) {
  const openWindow = (uri, type) => () => {
    if (type === 'facebook') {
      window.open(`${uri}?u=${sharingURI}`);
      return;
    }

    window.open(`${uri}?url=${sharingURI}`);
  };

  const ShareTitle = ({ icon, title }) => (
    <Row alignItems="center" className="DappUI__SharePopup__item">
      <div className="DappUI__SharePopup__icon">
        <SVG src={icon} />
      </div>
      <span className="DappUI__SharePopup__title">{title}</span>
    </Row>
  );

  return (
    <div className="DappUI__SharePopup">
      <ActionSheet
        position="left"
        items={[
          {
            title: (
              <ShareTitle
                title="Twitter"
                icon={require('src/asset/icons/social/twitter-solid.svg')}
              />
            ),
            onClick: openWindow('http://twitter.com/share', 'twitter'),
          },
          {
            title: (
              <ShareTitle
                title="Telegram"
                icon={require('src/asset/icons/social/telegram-solid.svg')}
              />
            ),
            onClick: openWindow('https://t.me/share/url', 'telegram'),
          },
          // {
          //   title: (
          //     <ShareTitle
          //       title="Discord"
          //       icon={require('src/asset/icons/social/discord-solid.svg')}
          //     />
          //   ),
          //   onClick: openWindow('https://t.me/share/url', 'discord'),
          // },
          {
            title: (
              <ShareTitle
                title="Facebook"
                icon={require('src/asset/icons/social/facebook.svg')}
              />
            ),
            onClick: openWindow(
              'https://www.facebook.com/sharer.php',
              'facebook'
            ),
          },
        ]}
      >
        {children}
      </ActionSheet>
    </div>
  );
}

SharePopup.propTypes = {
  sharingURI: PropTypes.string,
};

SharePopup.defaultProps = {
  sharingURI: '',
};

export default SharePopup;
