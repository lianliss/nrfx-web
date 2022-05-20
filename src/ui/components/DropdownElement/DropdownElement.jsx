import React from 'react';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './DropdownElement.less';

// Main
// Get 2 elements, and drop "dropElement" when
// Children click.
function DropdownElement({ children, dropElement }) {
  const [isActive, setIsActive] = React.useState(false);

  // Handlers
  const toggleDropdown = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div className={cn('DropdownElement', { active: isActive })}>
      <div className="DropdownElement__content" onClick={toggleDropdown}>
        {children}
      </div>
      {isActive && (
        <div className="DropdownElement__dropElement">{dropElement}</div>
      )}
    </div>
  );
}

export default DropdownElement;
