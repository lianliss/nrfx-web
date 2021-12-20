import React, {useState} from 'react';
import InlineSVG from "react-inlinesvg";

export default props => {
  const {src} = props;
  const [isLoaded, setIsLoaded] = useState(false);
  return <span className={`isvg ${isLoaded ? 'loaded' : 'loading'}`}>
    <InlineSVG
      {...props}
      onLoad={() => setIsLoaded(true)}
      onError={error => console.error('[SVG]', src.default || src, props)}
      uniquifyIDs={true}
      src={src.default || src} />
  </span>
};
