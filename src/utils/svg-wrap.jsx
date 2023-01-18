import _ from 'lodash';
import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import { classNames as cn } from '.';

export default (props) => {
  const { src } = props;
  const { flex, handleLoaded, ...svgProps } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <span
      className={cn('isvg', {
        loaded: isLoaded,
        loading: !isLoaded,
        flex,
      })}
      style={{
        display: flex && 'flex',
      }}
    >
      <InlineSVG
        {...svgProps}
        onLoad={() => {
          setIsLoaded(true);

          if (_.isFunction(handleLoaded)) {
            handleLoaded(true);
          }
        }}
        onError={(error) => console.error('[SVG]', src.default || src, props)}
        uniquifyIDs={true}
        src={src.default || src}
      />
    </span>
  );
};
