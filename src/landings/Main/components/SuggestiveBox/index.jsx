import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Col } from 'ui';
import CustomButton from 'dapp/ui/CustomButton/CustomButton';

// Utils
import { classNames as cn } from 'utils';
import { sizes } from './constants/types';

// Styles
import './index.less';

function SuggestiveBox({
  title,
  subtitle,
  icon,
  size,
  border,
  background,
  onClick,
  href,
  ...otherProps
}) {
  const Component = href ? 'a' : CustomButton;

  return (
    <Component
      className={cn('MainLanding-SuggestiveBox', size, { border, background })}
      onClick={onClick}
      href={href}
      {...otherProps}
    >
      {icon && (
        <div className="MainLanding-SuggestiveBox-icon">
          <div className="MainLanding-SuggestiveBox-icon__bg" />
          {icon}
        </div>
      )}
      <Col className="MainLanding-SuggestiveBox__content">
        <div className="MainLanding-SuggestiveBox__title">{title}</div>
        <div className="MainLanding-SuggestiveBox__subtitle">{subtitle}</div>
      </Col>
    </Component>
  );
}

SuggestiveBox.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  size: PropTypes.oneOf(Object.values(sizes)),
  border: PropTypes.bool,
  background: PropTypes.bool,
  onClick: PropTypes.func,
  href: PropTypes.string,
};

SuggestiveBox.defaultProps = {
  title: '',
  subtitle: '',
  icon: '',
  size: sizes.medium,
  border: false,
  background: false,
  onClick: () => {},
  href: '',
};

export default SuggestiveBox;
