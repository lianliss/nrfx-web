import React from 'react';

// Utils
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

export const TR = ({ children, className, background, custom }) => (
  <tr className={cn({ [className]: className, custom })} style={{ background }}>
    {children}
  </tr>
);

export const TD = ({ type, color, className, children }) => (
  <td className={cn({ [type]: type, [color]: color, className })}>
    {children}
  </td>
);

export default CabinetTable;
