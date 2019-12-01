import './FiatOperationModal.less';

import React from 'react';

import Modal from '../../../../ui/components/Modal/Modal';
import UI from '../../../../ui';
import { getLang, dateFormat, classNames as cn } from '../../../../utils';
import EmptyContentBlock from '../EmptyContentBlock/EmptyContentBlock';

function FiatOperationModal(props) {
  const { operation } = props;
  return (
    <Modal className="FiatOperationModal" isOpen={true} onClose={props.onBack}>
      <UI.ModalHeader>
        {getLang('cabinet_fiatWalletOperationModalTitle')}
      </UI.ModalHeader>
      <div>
        {typeof operation === "object" ? (
          <UI.List items={[
            { label: getLang('global_date'), value: dateFormat(operation.created_at) },
            { label: getLang('global_type'), value: <div className={cn('FiatOperationModal__status', operation.type)} >{operation.type_label}</div> },
            { label: getLang('global_amount'), value: <UI.NumberFormat number={operation.primary_amount} currency={operation.primary_currency} /> },
            { label: getLang('global_price'), value: <UI.NumberFormat number={operation.price} currency={operation.secondary_currency} /> },
          ]} />
        ) : (
          <EmptyContentBlock
            skipContentClass
            icon={require('../../../../asset/120/buy_currency.svg')}
            message={getLang("cabinet_merchantEmptyList")}
          />
        )}
      </div>
    </Modal>
  )
}

export default FiatOperationModal;
