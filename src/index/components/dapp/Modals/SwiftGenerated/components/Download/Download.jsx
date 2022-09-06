import React from 'react';

// Components
import SVG from 'utils/svg-wrap';
import { Button } from 'src/ui';

// Styles
import './Download.less';

function Download({ onIPaidClick, onBack, onClose }) {
  const [downloaded, setDownloaded] = React.useState(false);

  return (
    <div className="SwiftGenerated__download">
      <div className="SwiftGenerated__row">
        <div className="SwiftGenerated__download__title">
          <div className="back" onClick={onBack}>
            <SVG src={require('src/asset/icons/arrows/dropdown-medium.svg')} />
          </div>
          <h3>Swift transfer</h3>
          <span className="close" onClick={onClose}>
            <SVG src={require('src/asset/icons/close-popup.svg')} />
          </span>
        </div>
      </div>
      <div className="SwiftGenerated__row">
        <Button
          disabled={downloaded}
          type="lightBlue"
          size="large"
          onClick={() => setDownloaded(true)}
        >
          {downloaded ? 'Screenshot uploaded' : 'Download a screenshot'}
        </Button>
        <Button
          disabled={!downloaded}
          shadow={!downloaded}
          type={downloaded ? 'lightBlue' : 'secondary-alice'}
          size="large"
          onClick={onIPaidClick}
        >
          I paid
        </Button>
      </div>
    </div>
  );
}

export default Download;
