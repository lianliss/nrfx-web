import React from 'react';

// Components
import { SocialLinks } from 'dapp';

// Styles
import './index.less';

function P2P({ children }) {
  return (
    <div className="p2p">
      {children}
      <SocialLinks />
    </div>
  );
}

export default P2P;
