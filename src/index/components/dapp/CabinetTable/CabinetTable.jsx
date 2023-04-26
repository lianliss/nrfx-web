import React from 'react';

// Utils
import { classNames as cn } from 'utils';

// Styles
import './CabinetTable.less';

function CabinetTable({ header, children, type }) {
  return (
    <table className={cn('CabinetTable', type)}>
      <thead>{header}</thead>
      <tbody>{children}</tbody>
    </table>
  );
}

export const Tip = ({ style, children }) => (
  <span style={style} className="CabinetTable__tip">
    {children}
  </span>
);

export const TR = ({ children, className, background, custom }) => (
  <tr className={cn({ [className]: className, custom })} style={{ background }}>
    {children}
  </tr>
);

export const TD = ({ type, color, className, children, dataLabel }) => (
  <td
    className={cn({ [type]: type, [color]: color }, className)}
    data-label={dataLabel}
  >
    {children}
  </td>
);

export default CabinetTable;
