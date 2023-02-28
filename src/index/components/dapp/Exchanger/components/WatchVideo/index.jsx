import React from 'react';

// Components
import { Button } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { openStateModal } from 'src/actions';
import { getLang } from 'utils';

// Styles
import './index.less';

function WatchVideo({ adaptive }) {
  const mobileLink = 'https://www.youtube.com/embed/hl74Wr0fQaE';
  const desktopLink = 'https://www.youtube.com/embed/D-YiX8GtzT4';

  return (
    <div className="Exchanger__WatchVideo">
      <div className="Exchanger__WatchVideo-text">
        <SVG src={require('src/asset/icons/video/play-square-solid.svg')} />
        <span>{getLang('dapp_how_to_buy_narfex')}</span>
      </div>
      <div className="Exchanger__WatchVideo-button">
        <Button
          type="white"
          size="middle"
          onClick={() =>
            openStateModal('watch_video', {
              link: adaptive ? mobileLink : desktopLink,
              title: getLang('dapp_how_to_buy_narfex'),
            })
          }
        >
          <SVG src={require('src/asset/icons/video/play-circle-solid.svg')} />
          <span>{getLang('dapp_watch_instruction')}</span>
        </Button>
      </div>
    </div>
  );
}

export default WatchVideo;
