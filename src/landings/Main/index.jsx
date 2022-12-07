import React from 'react';
import { useSelector } from 'react-redux';
import { adaptiveSelector } from '../../selectors';
import Skeleton from '../../ui/components/Skeleton/Skeleton';

// Components
import Promo from './containers/Promo';

// Styles
import './index.less';

function Main() {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <div className="MainLanding">
      <Promo adaptive={adaptive} />
    </div>
  );
}

export default Main;
