import React from 'react';
import { classNames as cn } from 'src/utils';
// Components
import CabinetWalletSidebar from '../CabinetWalletSidebar/CabinetWalletSidebar';

// Style
import './AdaptiveSidebar.less';

function AdaptiveSidebar({ route, active, onClose }) {
  React.useEffect(() => {
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    // Deactive scroll if sidebar is open
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (active) {
      scrollToTop();
      html.classList.add('noScroll');
      body.classList.add('noScroll');
    } else {
      html.classList.remove('noScroll');
      body.classList.remove('noScroll');
    }

    return () => {
      html.classList.remove('noScroll');
      body.classList.remove('noScroll');
    };
  }, [active]);

  React.useMemo(() => {
    onClose();
  }, [route]);

  return (
    <div className={cn('AdaptiveSidebar', { active })}>
      <div className="AdaptiveSidebar__bg" onClick={onClose} />
      <CabinetWalletSidebar className={cn({ active })} />
    </div>
  );
}

export default AdaptiveSidebar;
