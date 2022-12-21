import React from 'react';

import { classNames as cn } from 'utils';

// Styles
import './index.less';

function TypewriterEffect({ className, text, duration = 0.15, play }) {
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
    <span
      className={cn('MainLanding-TypewriterEffect', className, {
        play,
        finished,
      })}
    >
      {displayedText}
    </span>
  );
}

export default TypewriterEffect;
