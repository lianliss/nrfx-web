import React from 'react';

// Styles
import './ComingSoonItem.less';

function ComingSoonItem({ text }) {
  const [isHover, setIsHover] = React.useState(false);
  const [opacity, setOpacity] = React.useState(1);

  const setItemStatus = (isHover) => {
    setOpacity(0);
    setTimeout(() => {
      setIsHover(isHover);
      setOpacity(1);
    }, 100);
  };

  const handleMouseEnter = () => {
    setItemStatus(true);
  };

  const handleMouseLeave = () => {
    setItemStatus(false);
  };

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="CabinetSidebar__ComingSoonItem"
      style={{ opacity }}
    >
      {isHover ? 'Coming Soon' : text}
    </li>
  );
}

export default ComingSoonItem;

