import React from 'react';

// Utils
import { classNames as cn } from 'utils';
import _ from 'lodash';

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

export const TD = ({
  type,
  color,
  className,
  children,
  dataLabel,
  contentWidth,
}) => {
  const tdRef = React.useRef();
  const [width, setWidth] = React.useState();

  React.useEffect(() => {
    if (!contentWidth) return;
    if (!tdRef) return;

    setWidth(_.get(tdRef, 'current.children[0].offsetWidth'));
  }, [tdRef]);

  return (
    <td
      className={cn({ [type]: type, [color]: color }, className)}
      data-label={dataLabel}
      style={{
        width,
      }}
      ref={tdRef}
    >
      {children}
    </td>
  );
};

export default CabinetTable;
