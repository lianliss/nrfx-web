import React from 'react';
import InlineSVG from "react-inlinesvg";

export default props => {
  const {src} = props;
  return <InlineSVG src={src.default || src} />
};
