import React from 'react';

// Components
import { Button } from 'ui';
import SVG from 'utils/svg-wrap';

// Utils
import { openStateModal } from 'src/actions';

// Styles
import './index.less';

function WatchVideo() {
  return (
    <div className="Exchanger__WatchVideo">
      <div className="Exchanger__WatchVideo-text">
        <SVG src={require('src/asset/icons/video/play-square-solid.svg')} />
        <span>How to buy Narfex?</span>
      </div>
      <div className="Exchanger__WatchVideo-button">
        <Button
          type="white"
          size="middle"
          onClick={() =>
            openStateModal('watch_video', {
              link: 'https://www.youtube.com/embed/h7kMEqyLsHA',
            })
          }
        >
          <SVG src={require('src/asset/icons/video/play-circle-solid.svg')} />
          <span>Watch instruction</span>
        </Button>
      </div>
    </div>
  );
}

export default WatchVideo;
