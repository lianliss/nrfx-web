import './InfoRow.less';

import React from 'react';

import { classNames } from '../../../utils';

export default function InfoRow({ label, children }) {
  return (
    <tr className="InfoRow">
      <td className="InfoRow__label">{label}</td>
      <td className="InfoRow__value">{children}</td>
    </tr>
  )
}

export function InfoRowGroup({ children, className }) {
  return (
    <table className={classNames({
      InfoRow__group: true,
      [className]: !!className
    })}>
      <tbody>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return React.cloneElement(child);
        })}
      </tbody>
    </table>
  )
}