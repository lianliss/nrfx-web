import React from "react";
import "./Clipboard.less";
import Clipboard from "src/index/components/cabinet/Clipboard/Clipboard";

export default ({ text, length, skip_icon }) => {
  const separator = "...";
  const textPartLength = (length - separator.length) / 2;
  const content = length
    ? text.slice(0, textPartLength) + "..." + text.slice(-textPartLength)
    : text;
  if (!text) {
    return "-";
  }
  return (
    <Clipboard
      className="AdminClipboard"
      text={content}
      title={text}
      skipIcon={skip_icon}
    />
  );
};
