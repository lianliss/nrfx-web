import React from 'react';
import { useSelector } from 'react-redux';
import { adaptiveSelector } from '../../selectors';
import Skeleton from '../../ui/components/Skeleton/Skeleton';
import Exchanger from './containers/Exchanger';

// Components
import Promo from './containers/Promo';

// Styles
import './index.less';

function Main() {
  const adaptive = useSelector(adaptiveSelector);

  return (
    <div className="MainLanding">
      <Promo adaptive={adaptive} />
      <Exchanger adaptive={adaptive} />
      <div>jaj</div>
    </div>
  );
}

export default Main;
