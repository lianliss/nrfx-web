import React from 'react';
import PropTypes from 'prop-types';

import { classNames as cn } from 'utils';

// Styles
import './index.less';

function TypewriterEffect({
  className,
  text,
  duration,
  play,
  tag: Tag = 'span',
}) {
  const [displayedText, setDisplayedText] = React.useState('');
  const [finished, setFinished] = React.useState(false);

  React.useEffect(() => {
    if (play) {
      playAnimation();
    }
  }, [play]);

  const playAnimation = (initialText = '') => {
    const newText = text.substring(0, initialText.length + 1);
    setDisplayedText(newText);

    if (newText.length === text.length) {
      setFinished(true);
      return;
    }

    return setTimeout(() => playAnimation(newText), duration * 1000);
  };

  return (
    <Tag
      className={cn('MainLanding-TypewriterEffect', className, {
        play,
        finished,
      })}
    >
      {displayedText}
    </Tag>
  );
}

TypewriterEffect.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  duration: PropTypes.number,
  play: PropTypes.bool,
};

TypewriterEffect.defaultProps = {
  className: '',
  text: '',
  duration: 0.15,
  play: false,
};

export default TypewriterEffect;
