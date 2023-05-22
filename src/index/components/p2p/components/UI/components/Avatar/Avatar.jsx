import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { classNames as cn } from 'utils';
import avatarIcon from 'src/asset/illustrations/people/p2p_working_instruction_avatar.svg';

// Styles
import styles from './Avatar.module.less';

function Avatar({ size, position }) {
  return <img className={cn(styles.Avatar, size, position)} src={avatarIcon} />;
}

Avatar.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  position: PropTypes.oneOf('left', 'top'),
};

Avatar.defaultProps = {
  size: 'medium',
  position: 'left',
};

export default Avatar;
