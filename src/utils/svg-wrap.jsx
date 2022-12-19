import _ from 'lodash';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import { classNames as cn } from '.';

export default (props) => {
  const { src } = props;
  const { flex, ...svgProps } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoaded = () => {
    setIsLoaded(true);

    if (_.isFunction(props.setIsLoaded)) {
      props.setIsLoaded(true);
    }
  };

  return (
    <span
      className={cn('isvg', {
        loaded: isLoaded,
        loading: !isLoaded,
        flex,
      })}
    >
      <InlineSVG
        {...svgProps}
        onLoad={handleLoaded}
        onError={(error) => console.error('[SVG]', src.default || src, props)}
        uniquifyIDs={true}
        src={src.default || src}
      />
    </span>
  );
};
