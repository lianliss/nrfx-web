import React from 'react';

import { classNames as cn } from 'utils';

// Styles
import './CabinetTable.less';

function CabinetTable({ header, children }) {
  return (
    <table className="CabinetTable">
      <thead>{header}</thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export const TR = ({ children, className }) => (
  <tr className={cn({ className })}>{children}</tr>
);

export const TD = ({ type, color, className, children }) => (
  <td className={cn({ [type]: type, [color]: color, className })}>
    {children}
  </td>
);

export default CabinetTable;
