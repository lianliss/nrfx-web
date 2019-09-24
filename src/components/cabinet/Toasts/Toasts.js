import './Toasts.less';
import React from 'react';
import * as storeUtils from '../../../storeUtils';
import * as CLASSES from "../../../constants/classes";
import Toast from "../../../ui/components/Toast/Toast"

function Toasts(props) {
  return (
    <div className="Toasts">
      {props.toasts.items.map(toast => (
        <Toast
          type={toast.type}
          key={toast.id}
          message={toast.message}
          hidden={toast.hidden}
          onClose={ () => props.toastDrop(toast.id)}
        />
      ))}
    </div>
  )
}

export default storeUtils.getWithState(
  CLASSES.COMPONENT_TOASTS,
  Toasts
);
