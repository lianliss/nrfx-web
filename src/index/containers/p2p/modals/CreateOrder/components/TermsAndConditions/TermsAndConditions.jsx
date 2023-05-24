import React from 'react';

function TermsAndConditions({terms}) {
  return (
    <div className="p2p-modal-create-order-terms">
      <h3>Terms and conditions</h3>
      <p className="moderate-fz normal-fw">
        {terms}
      </p>
    </div>
  );
}

export default TermsAndConditions;
