import React from 'react';
import { classNames as cn } from 'src/utils';
// Components
import CabinetWalletSidebar from '../CabinetWalletSidebar/CabinetWalletSidebar';

// Style
import './AdaptiveSidebar.less';

function AdaptiveSidebar({ route, active, onClose }) {
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Deactive scroll if sidebar is open
    if (active) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'scroll';
    }
  }, [active]);

  React.useMemo(() => {
    onClose();
  }, [route]);

  React.useEffect(() => {
    return () => {
      document.body.style.overflowY = 'scroll';
    };
  }, []);

  return (
    <div className={cn('AdaptiveSidebar', { active })}>
      <div className="AdaptiveSidebar__bg" onClick={onClose} />
      <CabinetWalletSidebar className={cn({ active })} />
    </div>
  );
}

export default AdaptiveSidebar;
