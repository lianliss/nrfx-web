import './ModalState.less';

import React from 'react';
import UI from '../../../ui';

import * as utils from '../../../utils';
import LoadingStatus from '../LoadingStatus/LoadingStatus';

export default function ModalState({ status, onRetry }) {
  return (
    <UI.Modal isOpen skipClose={status === 'loading'} onClose={() => window.history.back()}>
      <div className={utils.classNames({
        ModalState: true,
        [status]: true,
      })}>
        <LoadingStatus status={status} inline={status !== 'loading'} onRetry={onRetry} />
      </div>
    </UI.Modal>
  )
}
