import React from 'react';
import Skeleton from '../../ui/components/Skeleton/Skeleton';

// Components
import Promo from './containers/Promo';

// Styles
import './index.less';

function Main() {
  return (
    <div className="MainLanding">
      <Promo />
    </div>
  );
}

export default Main;
