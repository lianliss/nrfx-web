import React from "react";

// Popup timer for close
// @param {bool} isHover - Popup container is mouse hover.
// @param {func} onClose - Popup close function.
// @param {number} time - Time, after that popup will be close and
// return data. Default is 2000 === 2s.
// Return {bool} isDisabled - Set this for your popup for start close animation.
// Only for Popup component.
export default function popupTimer(isHover, onClose, time = 2000) {
  const [isDisabled, setIsDisabled] = React.useState(false);

  const closePopupInterval = setInterval(() => {
    if(!isHover) {
    	// Set disabled
      setIsDisabled(true);
      setTimeout(() => {
      	// Activate close function
        onClose();
      }, 200)
    }
  }, time);

  // Clear Interval.
  React.useEffect(() => () => {clearInterval(closePopupInterval)});

  return isDisabled;
}