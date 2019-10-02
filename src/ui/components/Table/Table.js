// styles
import './Table.less';
// external
import React, {useState} from 'react';
import PropTypes from 'prop-types';
// internal
import Hover from '../Hover/Hover';
import * as utils from '../../utils';

import { ReactComponent as AngleDownSmall } from '../../asset/angle-down-small.svg';
import { ReactComponent as AngleUpSmall } from '../../asset/angle-up-small.svg';

function Table({ headings, children, className, header, hidden, adaptive }) {
  const [hiddenContent, setHiddenContent] = useState(hidden || false);
  return (
    <div className="TableMain Content_box">
      {header && <div
        onClick={(adaptive && hidden) ? () => {setHiddenContent(!hiddenContent)} : () => {}}
        className="Table__header"
        style={adaptive ? {height: 56} : {}}
      >
        <span style={adaptive && hidden ? {color: 'var(--link-color)'} : {}}>{header}</span>
        {adaptive && hidden && <span className="icon">
          {hiddenContent ? <AngleDownSmall /> : <AngleUpSmall />}
        </span>}
      </div>}


      {(!adaptive || (adaptive && !hiddenContent)) && <table className={utils.classNames({
        Table: true,
        [className]: !!className
      })}>
        <thead>
          <tr>
            {React.Children.map(headings, (child, i) => {
              if (!React.isValidElement(child)) {
                return child;
              }

              return React.cloneElement(child, {
                key: i
              });
            })}
          </tr>
        </thead>
        <tbody>
          {React.Children.map(children, (child, i) => {
            if (!React.isValidElement(child)) {
              return child;
            }

            return React.cloneElement(child, {
              dark: i % 2 === 0
            });
          })}
        </tbody>
      </table>}
    </div>
  )
}

export function TableCell({ children, onClick, dark }) {
  let Component = 'tr';
  let params = {};
  if (onClick) {
    Component = Hover;
    params.tagName = 'tr';
  }

  return (
    <Component
      onClick={onClick}
      className={utils.classNames({
        dark: !!dark
      })}
      {...params}
    >
      {children}
    </Component>
  )
}

TableCell.propTypes = {
  dark: PropTypes.bool
};

export function TableColumn({ children, align, style, highlighted, sub }) {
  return (
    <td
      className={utils.classNames({
        [align]: !!align,
        highlighted: !!highlighted
      })}
      style={style}
    >
      <div className="Table__td__cont">{children}</div>
      {sub && <div className="Table__sub">{sub}</div>}
    </td>
  )
}

TableColumn.propTypes = {
  highlighted: PropTypes.bool,
  align: PropTypes.oneOf(['center', 'right']),
  style: PropTypes.object,
  sub: PropTypes.string
};

export default Table;